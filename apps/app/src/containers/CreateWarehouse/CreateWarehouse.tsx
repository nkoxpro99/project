import { FormikProps } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemType,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';

import { api } from '../../axios/axios';
import {
  CreateWarehouseForm,
  CreateWarehouseFormValuesType,
  CreateWarehouseProvider,
} from '../../components/CreateWarehouseForm';

export const CreateWarehouse = () => {
  const [stepperCanNext, setStepperCanNext] = useState<boolean>();
  const currentStepRef = useRef<number>();
  const createWarehouseFormRef = useRef<FormikProps<CreateWarehouseFormValuesType>>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const stepperItems = useMemo<StepperItemType[]>(
    () => [
      {
        label: 'Nhập thông tin',
        status: 'active',
        content: <CreateWarehouseForm />,
      },
      // {
      //   label: 'Điều khoản',
      //   status: 'default',
      //   content: <Privacy onAgreedChange={(value) => setStepperCanNext(value)} />,
      // },
    ],
    [],
  );

  const handleNextButtonClick = (curr: number | undefined) => {};

  return (
    <Container>
      <CreateWarehouseProvider
        innerRef={createWarehouseFormRef}
        onFormValidChange={(payload) => {
          console.log(payload);

          if (currentStepRef.current !== 0) return;
          if (payload.isValid) setStepperCanNext(true);
          else setStepperCanNext(false);
        }}
      >
        <Stepper
          isCanNext={stepperCanNext}
          items={stepperItems}
          onComplete={() => {
            const { current: formikProps } = createWarehouseFormRef;

            console.log(formikProps?.values);

            if (user) {
              const warehouse = { ...formikProps?.values, createdDate: moment().format(), userId: user.id };
              api.post(`warehouse/`, warehouse).then(() => {
                navigate('/list');
              });
            }
          }}
          onStepChange={(s) => {
            currentStepRef.current = s;

            if (s === 1) {
              setStepperCanNext(false);
            } else if (s === 0) {
              createWarehouseFormRef.current?.validateForm().then((errors) => {
                setStepperCanNext(isEmpty(errors));
              });
            }
          }}
        >
          <Header>
            <TextContainer>
              <Title>Tạo kho bãi</Title>
              <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
            </TextContainer>
            <StepperProgression />
            <ButtonContainer>
              <StepperBackButton color="secondary"></StepperBackButton>
              <StepperNextButton onClick={handleNextButtonClick}></StepperNextButton>
            </ButtonContainer>
          </Header>
          <StepperContentRenderer />
        </Stepper>
      </CreateWarehouseProvider>
    </Container>
  );
};

const Container = styled.div``;

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

const Title = styled.h1``;

const Detail = styled.span`
  color: #999;
`;
