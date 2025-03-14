import { Formik, FormikConfig, FormikValues } from 'formik';

import { FormValidateWrapper } from '../FormValidateWrapper';
import { FormValidPayload } from '../models';

export type FormProviderProps<Values> = FormikConfig<Values> & {
  onFormValidChange?: (payload: FormValidPayload<Values>) => void;
};

export const FormProvider = <Values extends FormikValues = FormikValues>({
  initialValues,
  children,
  onFormValidChange,
  ...otherProps
}: FormProviderProps<Values>) => {
  return (
    <Formik {...otherProps} initialValues={initialValues}>
      <FormValidateWrapper onFormValidChange={onFormValidChange}>{children}</FormValidateWrapper>
    </Formik>
  );
};
