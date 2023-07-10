import { Page } from '@layout';
import { Form } from '@components';

export function SingInPage() {
  const formFields = [
    { id: 'first_name', label: 'Имя' },
    { id: 'second_name', label: 'Фамилия' },
    { id: 'login', label: 'Логин' },
    { id: 'email', label: 'Почта' },
    { id: 'phone', label: 'Телефон' },
    { id: 'password', label: 'Пароль', type: 'password' },
    { id: 'repeat', label: 'Пароль (еще раз)', type: 'password' }
  ];

  const singInForm = Form({
    fields: formFields,
    title: 'Регистрация',
    buttonText: 'Зарегистироваться',
    linkHref: '/login',
    linkText: 'Войти'
  });

  return Page({ children: singInForm });
}
