import { FormikConfig, FormikErrors } from 'formik';

export type FormValidPayload<Values> =
  | {
      isValid: true;
      values: Values;
    }
  | { isValid: false; errors: FormikErrors<Values> };

export type ProviderProps<Values> = Omit<FormikConfig<Values>, 'initialValues' | 'onSubmit'> & {
  onFormValidChange?: (payload: FormValidPayload<Values>) => void;
};
