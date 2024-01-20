import { TValidationResult } from './type';

// eslint-disable-next-line unicorn/better-regex
const emailRegExp = /^[a-zA-Z\d_-]*@[a-zA-Z\d_-]*.[a-zA-Z_-]*$/;
const capitalLetterRegExp = /(?=.*[A-Z])/;
// eslint-disable-next-line unicorn/better-regex
const digitRegExp = /(?=.*[\d])/;

export const password = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  const validBySymbols = emailRegExp.test(value);
  const validByCapitalLetter = capitalLetterRegExp.test(value);
  const validByDigitLetter = digitRegExp.test(value);

  if (!validBySymbols) {
    return {
      isValid: false,
      message: 'Пожалуйста проверьте введенные символы',
    };
  }

  if (!validByCapitalLetter) {
    return {
      isValid: false,
      message: 'Пожалуйста введите хотя бы 1 заглавную букву',
    };
  }

  if (!validByDigitLetter) {
    return {
      isValid: false,
      message: 'Пожалуйста введите хотя бы 1 цифру',
    };
  }

  return {
    isValid: true,
  };
};
