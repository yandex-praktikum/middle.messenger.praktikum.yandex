import { TValidationResult } from './type';

const onlyWordsAndDefisRegExp = /^[A-zА-я-]*$/;

export const name = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  const validBySymbols = onlyWordsAndDefisRegExp.test(value);
  const isFirstCapitlize = value[0].toUpperCase() === value[0];

  if (!validBySymbols) {
    return {
      isValid: false,
      message: 'Пожалуйста проверьте введенные символы',
    };
  }
  if (!isFirstCapitlize) {
    return {
      isValid: false,
      message: 'Первая буква должна быть заглавной',
    };
  }

  return {
    isValid: true,
  };
};
