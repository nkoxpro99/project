import moment from 'moment';
import { number, object } from 'yup';

import { FormProvider, ProviderProps } from '../Common/Form';

export type RenterInformationFormValuesType = {
  duration: number;
  startDate: Date;
};

const initialFormValues: RenterInformationFormValuesType = {
  duration: 1,
  startDate: moment().add(5, 'days').toDate(),
};

type RenterInformationProviderProps = ProviderProps<RenterInformationFormValuesType>;

export const RenterInformationProvider = ({
  children,
  onFormValidChange,
  ...otherProps
}: RenterInformationProviderProps) => {
  const RenterInformationSchema = object().shape({

    duration: number().moreThan(0).label('Thời hạn thuê').required(),
  });

  return (
    <FormProvider
      {...otherProps}
      initialValues={initialFormValues}
      validationSchema={RenterInformationSchema}
      onFormValidChange={onFormValidChange}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {children}
    </FormProvider>
  );
};
