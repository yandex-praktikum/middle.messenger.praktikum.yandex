export type InputData = {
  name: string
  label: string
  type: string
  placeholder: string
  required?: boolean
  autofocus?: boolean
  regex: RegExp
  warning: string
  value?: string | number
}
type InputsData = Record<string, InputData>

export const inputsData: InputsData = {
  login: {
    name: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Login',
    autofocus: true,
    required: true,
    regex: /^[a-zA-Z0-9-]{3,20}$/,
    warning: `Ограничения для логина:
        - от 3 до 20 символов, 
        - только латиница, 
        - цифры, но не состоять из них, 
        - без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
  },
  // login_new: {
  //   name: 'login_new',
  //   type: 'text',
  //   placeholder: 'Create your login',
  //   required: true,
  //   regex: /^[a-zA-Z0-9-]{3,20}$/,
  //   warning: `Ограничения для логина:
  //       - от 3 до 20 символов,
  //       - только латиница,
  //       - цифры, но не состоять из них,
  //       - без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
  // },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    warning: `Ограничения для пароля:
    - от 8 до 40 символов, 
    - обязательно хотя бы одна заглавная буква и цифра`,
  },
  password_old: {
    name: 'password_old',
    label: 'Old password',
    type: 'password',
    placeholder: 'Enter your old password',
    regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    warning: `Ограничения для пароля:
    - от 8 до 40 символов, 
    - обязательно хотя бы одна заглавная буква и цифра
    - должен совпадать с паролем аккаунта`,
  },
  password_new: {
    name: 'password_new',
    label: 'New password',
    type: 'password',
    placeholder: 'Create new password',
    regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    warning: `Ограничения для пароля:
    - от 8 до 40 символов, 
    - обязательно хотя бы одна заглавная буква и цифра`,
  },
  repeat_password: {
    name: 'repeat_password',
    label: 'Repeat password',
    type: 'password',
    placeholder: 'Repeat password',
    regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    warning: `Ограничения для пароля:
    - от 8 до 40 символов, 
    - обязательно хотя бы одна заглавная буква и цифра
    - должен совпадать с введенным новым паролем`,
  },
  display_name: {
    name: 'display_name',
    label: 'Display name',
    type: 'text',
    placeholder: 'Display name',
    autofocus: true,
    required: true,
    regex: /^[a-zA-Z0-9-]{3,20}$/,
    warning: `Ограничения для Имени:
        - от 3 до 20 символов, 
        - только латиница, 
        - цифры, но не состоять из них, 
        - без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
  },
  first_name: {
    name: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'Enter your name',
    required: true,
    autofocus: true,
    regex: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]*$/,
    warning: `Ограничения для Имени:
    - латиница или кириллица, 
    - первая буква должна быть заглавной, 
    - без пробелов и без цифр, 
    - нет спецсимволов (допустим только дефис)`,
  },
  second_name: {
    name: 'second_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    required: true,
    regex: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]*$/,
    warning: `Ограничения для Фамилии:
    - латиница или кириллица, 
    - первая буква должна быть заглавной, 
    - без пробелов и без цифр, 
    - нет спецсимволов (допустим только дефис)`,
  },
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    regex: /^[a-zA-Z0-9\-_]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    warning: `Ограничения для электронной почты:
     - латиница, 
     - может включать цифрыб дефис и подчёркивания, 
     - обязательно должна быть «собака» (@) и точка после неё, 
     - но перед точкой обязательно должны быть буквы.
`,
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter phone number',
    required: false,
    regex: /^\+?\d{10,15}$/,
    warning: `Ограничения для телефонного номера:
    - от 10 до 15 символов, 
    - состоит из цифр, 
    - может начинается с плюса`,
  },
  age: {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    regex: /^(?:\d{1,2}|1[01]\d|120)$/,
    warning: `Ограничения для возраста:
    - состоит из цифр, 
    - не может быть больше 120 лет`,
  },
  city: {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter your city',
    required: false,
    regex: /^(?![0-9])[A-Za-z0-9А-Яа-яЁё -]+$/,
    warning: `Ограничения для названия Города:
    - латиница или кириллица, 
    - нет спецсимволов (допустим только дефис)`,
  },
}
