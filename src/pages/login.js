import { Page } from '@layout';
import { Form } from '@components';

export function LoginPage() {
  const formFields = [
    { id: 'login', label: 'Логин' },
    { id: 'password', label: 'Пароль', type: 'password' }
  ];

  const loginForm = Form({
    fields: formFields,
    title: 'Вход',
    buttonText: 'Авторизоваться',
    linkHref: '/signin',
    linkText: 'Нет аккаунта?'
  });

  return Page({ children: loginForm });
}
