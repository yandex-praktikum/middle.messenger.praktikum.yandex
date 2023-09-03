export default [
  {
    label: 'Почта',
    type: 'email',
    name: 'login',
    error: true,
    errorText: 'Неверный формат почты',
  },
  {
    label: 'Логин',
    type: 'text',
    name: 'login',
    error: true,
    errorText: 'Неверный логин',
  },
  {
    label: 'Имя',
    type: 'text',
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    type: 'text',
    name: 'second_name',
  },
  {
    label: 'Телефон',
    type: 'phone',
    name: 'phone',
    error: true,
    errorText: 'Неверный формат телефона',
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password',
  },
  {
    label: 'Пароль (повторно)',
    type: 'password',
    name: 'password_repeat',
    error: true,
    errorText: 'Пароли не совпадают',
  },
];
