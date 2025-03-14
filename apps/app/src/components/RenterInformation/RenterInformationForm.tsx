import { Form, useFormikContext } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';

import { useWarehouseResolver } from '../../resolver/WarehouseResolver';
import { formatPrice } from '../../utils/format-price.util';
import { DatePicker } from '../Common/DatePicker';
import { FieldError } from '../Common/Form';
import { SuffixInput } from '../Common/SuffixInput';
import { RenterInformationFormValuesType } from './RenterInformationProvider';

export type RenterInformationFormProps = unknown;

export const RentingInformationForm = (props: RenterInformationFormProps) => {
  const [duration, setDuration] = useState(1);
  const {
    warehouse: { price },
  } = useWarehouseResolver();

  const { handleSubmit, handleChange, handleBlur, setFieldValue, values } =
    useFormikContext<RenterInformationFormValuesType>();

  return (
    <Container>
      <Title>Thông tin thuê</Title>
      <Form onSubmit={handleSubmit}>
        <Body>
          <LeftSide>
            <PriceContainer>Giá thuê: {formatPrice(price)} VND</PriceContainer>
          </LeftSide>

          <RightSide>
            <FormField>
              <Label>Thời hạn thuê</Label>
              <SuffixInput
                defaultValue={values.duration}
                min="1"
                name="duration"
                suffix="tháng"
                type="number"
                onBlur={handleBlur}
                onChange={(v) => {
                  setDuration(+v.target.value);

                  handleChange(v);
                }}
              />
            </FormField>
            <FieldError errorFor="duration" />
            <FormField>
              <Label>Ngày bắt đầu</Label>
              <DatePicker
                showDisabledMonthNavigation
                dateFormat={'dd/MM/yyyy'}
                maxDate={moment().add(15, 'days').toDate()}
                minDate={moment().add(5, 'days').toDate()}
                name="startDate"
                selected={values.startDate}
                onBlur={handleBlur}
                onChange={(date) => setFieldValue('startDate', date)}
              ></DatePicker>
            </FormField>
            <FieldError errorFor="date" />
            <Text>Thành tiền: {formatPrice(price * duration)} VND</Text>
          </RightSide>
        </Body>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Body = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1``;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid gray;
`;

const Text = styled.span``;

const PriceContainer = styled.h3``;
