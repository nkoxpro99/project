import { ErrorMessage } from 'formik';
import styled from 'styled-components';

export type FieldErrorProps = {
  errorFor: string;
  mustTouched?: boolean;
};

export function FieldError({ errorFor }: FieldErrorProps) {
  return (
    <ErrorMessageWrapper>
      <ErrorMessage name={errorFor}></ErrorMessage>
    </ErrorMessageWrapper>
  );
}

const ErrorMessageWrapper = styled.div`
  margin-top: 5px;
  color: red;
  font-style: italic;
  font-size: 0.8rem;
`;
