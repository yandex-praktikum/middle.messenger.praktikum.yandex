import { TValidationResult } from './type';

// eslint-disable-next-line unicorn/better-regex
const phoneRegExp = /^[+\d]\d{9,14}/;

export const phone = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  const validBySymbols = phoneRegExp.test(value);

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
