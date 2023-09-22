function validateName(value: string): string {
  return /^[А-ЯA-Z][а-яa-z\-]*$/.test(value)
    ? ""
    : "Должно начинаться с заглавной буквы, содержать латиницу или кириллицу";
}

function validateLogin(value: string): string {
  return /^(?![0-9]+$)[a-zA-Z0-9_-]{3,20}$/.test(value)
    ? ""
    : "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).";
}

function validateEmail(value: string): string {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value)
    ? ""
    : "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.";
}

function validatePassword(value: string): string {
  return /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)
    ? ""
    : "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.";
}

function validatePhone(value: string): string {
  return /^\+?\d{10,15}$/.test(value)
    ? ""
    : "от 10 до 15 символов, состоит из цифр, может начинается с плюса.";
}

export {
  validateName,
  validateLogin,
  validateEmail,
  validatePassword,
  validatePhone,
};
