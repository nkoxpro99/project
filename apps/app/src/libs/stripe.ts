import { Appearance, loadStripe } from '@stripe/stripe-js';

import { STRIPE_API_KEY } from './constants';

export const stripePromise = loadStripe(STRIPE_API_KEY);

export const stripeAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    fontFamily: 'GeneralSans-Variable, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontWeightNormal: '500',
  },
};
