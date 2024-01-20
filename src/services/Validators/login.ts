import { TValidationResult } from './type';

// eslint-disable-next-line unicorn/better-regex
const onlyEngWordsAndDefisRegExp = /^[-\d_a-z]*$/;
const engWordExistExp = /[a-z]*/;

export const login = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }
  if (value.length < 3 || value.length > 20) {
    return {
      isValid: false,
      message: 'Логин должен быть больше 3 символов и меньше 20',
    };
  }

  const validBySymbolls = onlyEngWordsAndDefisRegExp.test(value);
  const existLetters = value.match(engWordExistExp);

  if (!validBySymbolls) {
    return {
      isValid: false,
      message: 'Пожалуйста проверьте введенные символы',
    };
  }

  if (!existLetters) {
    return {
      isValid: false,
      message: 'Логин должен содержать хотя бы одну букву',
    };
  }

  return {
    isValid: true,
  };
};
