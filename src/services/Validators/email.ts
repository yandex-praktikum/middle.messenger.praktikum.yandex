import { TValidationResult } from './type';

// eslint-disable-next-line unicorn/better-regex
const emailRegExp = /^[a-zA-Z\d_-]*@[a-zA-Z\d_-]*.[a-zA-Z_-]*$/;

export const email = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  const validBySymbols = emailRegExp.test(value);

  if (!validBySymbols) {
    return {
      isValid: false,
      message: 'Пожалуйста проверьте введенные символы',
    };
  }

  return {
    isValid: true,
  };
};
