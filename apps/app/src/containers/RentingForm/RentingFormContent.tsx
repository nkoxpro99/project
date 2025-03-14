import { Elements } from '@stripe/react-stripe-js';
import { Appearance, PaymentIntent, StripeElementsOptions } from '@stripe/stripe-js';
import { useFormikContext } from 'formik';
import { isEmpty, mapValues } from 'lodash';
import moment from 'moment';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { api } from '@/axios/axios';
import { Dialog } from '@/components/Common/Dialog';
import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemType,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';
import { ContractConfirmation } from '@/components/ContractConfirmation';
import { RenterInformationFormValuesType, RentingInformationForm } from '@/components/RenterInformation';
import { RentingConfirmation } from '@/components/RentingConfirmation';
import { stripePromise } from '@/libs';
import { CreateRentedWarehouseModel } from '@/models/rented-warehouse.model';
import { useRentingWarehouseResolver } from '@/resolver';
import { calculateRentingWarehousePrices } from '@/utils/calculate-renting-warehouse-prices';
import { convertDateToLocaleDateFormat } from '@/utils/datetime-format.util';
import { generateContractHash } from '@/utils/encrypt';
import { formatPrice } from '@/utils/format-price.util';
import { getAllRentingInfoDates } from '@/utils/rented-warehouse.util';

import { CustomerCheckoutForm } from './CustomerCheckoutForm';

export type RentingState = {
  price: number;
  total: number;
  deposit: number;
  confirm: number;
  startDate: Date;
  endDate: Date;
  rentedDate: Date;
  duration: number;
  key: string;
  hash: string;
};

export function RentingFormContent() {
  const { user } = useAuthStore();
  const { warehouse, owner, renter } = useRentingWarehouseResolver();

  const { values, validateForm, errors } = useFormikContext<RenterInformationFormValuesType>();

  const [isStepperCanNext, setStepperCanNext] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const calculateRentingState = useCallback(() => {
    const price = warehouse.price;
    const duration = values.duration;
    const startDate = values.startDate;
    const prices = calculateRentingWarehousePrices(price, duration);
    const dates = mapValues(getAllRentingInfoDates(startDate, duration), (date) => date.toDate());
    const { hash, key } = generateContractHash({
      renterId: renter.id,
      warehouseId: warehouse.id,
      rentedDate: dates.rentedDate,
    });

    return { ...prices, ...dates, price, duration, key, hash };
  }, [values, warehouse, renter]);

  const [rentingState, setRentingState] = useState<RentingState>(calculateRentingState);

  useEffect(() => {
    setRentingState(calculateRentingState());
  }, [calculateRentingState]);

  const dialogContentRef = useRef<ReactNode>(null);
  const contractRef = useRef<string>('');

  const rentingConfirmationElement = useMemo(
    () => <RentingConfirmation rentingState={rentingState} warehouse={warehouse} />,
    [warehouse, rentingState],
  );
  const contractConfirmationElement = useMemo(() => {
    const { duration, endDate, startDate, hash } = rentingState;
    return (
      renter &&
      owner && (
        <ContractConfirmation
          contractOptions={{
            code: hash,
            duration,
            endDate,
            startDate,
            owner,
            renter,
            warehouse,
          }}
          getContract={(contract) => {
            contractRef.current = contract;
          }}
          onAgreedChange={setStepperCanNext}
        />
      )
    );
  }, [rentingState, owner, renter, warehouse]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(errors)) {
      setStepperCanNext(true);
    } else setStepperCanNext(false);
  }, [errors]);

  const stripeAppearance: Appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'GeneralSans-Variable, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontWeightNormal: '500',
    },
  };

  const stepperItems: StepperItemType[] = useMemo(
    () => [
      {
        label: 'Nhập thông tin',
        status: 'active',
        content: <RentingInformationForm />,
      },
      {
        label: 'Xem hợp đồng',
        status: 'default',
        content: contractConfirmationElement,
      },
      {
        label: 'Xác nhận',
        status: 'default',
        content: rentingConfirmationElement,
      },
    ],
    [contractConfirmationElement, rentingConfirmationElement],
  );

  const handleSaveRentedWarehouse = (paymentIntent: PaymentIntent) => {
    if (user) {
      const { startDate, endDate, rentedDate, deposit, confirm, total, hash } = rentingState;

      const rentedWarehouse: CreateRentedWarehouseModel = {
        renterId: user.id,
        warehouseId: warehouse.id,
        rentedDate: moment(rentedDate).format(),
        startDate: moment(startDate).format(),
        endDate: moment(endDate).format(),
        contractBase64: contractRef.current,
        deposit,
        confirm,
        total,
        depositPayment: paymentIntent.id,
        hash,
      };

      console.log(rentedWarehouse);

      api.post(`rentedWarehouse`, rentedWarehouse).then(() => {
        navigate('/home');
      });
    }
  };

  const handleOnPayment = () => {
    setStepperCanNext(false);
    const { deposit, confirm: remain, startDate } = rentingState;
    api
      .post<{ clientSecret: string }>('/payment/fee', { amount: deposit, ownerId: owner?.id, userId: user?.id })
      .then((response) => {
        const clientSecret = response.data.clientSecret;
        const options: StripeElementsOptions = {
          clientSecret,
          appearance: stripeAppearance,
        };

        dialogContentRef.current = (
          <Elements options={options} stripe={stripePromise}>
            <WarningWrapper>
              <Title>Xác nhận thanh toán</Title>
              <span>
                <p>
                  Sau khi xác nhận thanh toán, bạn sẽ trả phần tiền cọc là <strong>{formatPrice(deposit)} VND</strong>.
                </p>
                <p>
                  Sau đó bạn cần phải thanh toán phần còn lại sau tiền cọc là <strong>{formatPrice(remain)} VND</strong>{' '}
                  trước <strong>{convertDateToLocaleDateFormat(startDate)}</strong> để hoàn thành việc thuê kho bãi.
                </p>
                <p>
                  <strong>Lưu ý:</strong> Nếu như không thanh toán đúng hạn, yêu cầu thuê kho của bạn sẽ bị hủy và sẽ
                  không được hoàn lại số tiền đã cọc.
                </p>
              </span>
            </WarningWrapper>

            <CustomerCheckoutForm clientSecret={clientSecret} total={deposit} onSucceed={handleSaveRentedWarehouse} />
          </Elements>
        );

        setPaymentDialogOpen(true);
        setStepperCanNext(true);
      });
  };

  return (
    <>
      <Stepper
        defaultCanNextOnNewStep={false}
        isCanNext={isStepperCanNext}
        items={stepperItems}
        onCanNextChange={setStepperCanNext}
        onComplete={() => handleOnPayment()}
        onStepChange={(step) => {
          if (step === 0) {
            validateForm().then((errors) => {
              setStepperCanNext(isEmpty(errors));
            });
          } else if (step === 2) {
            setStepperCanNext(true);
          }
        }}
      >
        <Header>
          <TextContainer>
            <Title>Thuê {warehouse.name}</Title>
            <StepperProgression />
          </TextContainer>
          <ButtonContainer>
            <StepperBackButton color="secondary" />
            <StepperNextButton />
          </ButtonContainer>
        </Header>
        <StepperContentRenderer />
      </Stepper>
      <PaymentDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        {dialogContentRef.current}
      </PaymentDialog>
    </>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const WarningWrapper = styled.div`
  width: 500px;
`;

const PaymentDialog = styled(Dialog)`
  background-color: white;
`;
