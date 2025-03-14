import * as yup from 'yup';

declare module 'yup' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface StringSchema {
    phone(message?: string): this;
    integer(message?: string): this;
    lengths(lengths: number[], message?: string);
  }
}

export default yup;
