import './sing-in.scss';
import Handlebars from 'handlebars';
import { tmpl } from './sign-in.tmpl.js';

// Components
import { Input } from '../../components/input/index.js';
import { Button } from '../../components/button/index.js';
import { Link } from '../../components/link/index.js';

export const Signin = (props) => {
  const inputs = {
    inputEmail: Input({ type: 'email', label: 'Почта', name: 'email' }),
    inputLogin: Input({ type: 'text', label: 'Логин', name: 'login' }),
    inputFirstName: Input({ type: 'text', label: 'Имя', name: 'first_name' }),
    inputLastName: Input({ type: 'text', label: 'Фамилия', name: 'second_name' }),
    inputPhone: Input({ type: 'tel', label: 'Телефон', name: 'phone' }),
    inputPassword: Input({ type: 'password', label: 'Пароль', name: 'password' }),
    inputConfirmPassword: Input({ type: 'password', label: 'Пароль', name: 'password_confirm' }),
  };

  const combineProps = {
    ...props,
    ...inputs,
    button: Button({ text: 'Зарегистрироваться', type: 'submit' }),
    link: Link({ to: '/login', text: 'Войти' }),
    title: 'Регистрация',
  };

  return Handlebars.compile(tmpl)(combineProps);
};
