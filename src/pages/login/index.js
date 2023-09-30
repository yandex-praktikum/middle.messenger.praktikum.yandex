import './login.scss';
import Handlebars from 'handlebars';
import { tmpl } from './login.tmpl.js';

// Components
import { Button } from '../../components/button/index.js';
import { Input } from '../../components/input/index.js';
import { Link } from '../../components/link/index.js';

export const Login = (props) => {
  const inputs = {
    inputLogin: Input({ type: 'text', label: 'Логин', name: 'login' }),
    inputPassword: Input({ type: 'password', label: 'Пароль', name: 'password' }),
  };

  const combineProps = {
    ...inputs,
    button: Button({ text: 'Авторизоваться', type: 'submit' }),
    link: Link({ to: '/sign-in', text: 'Нет аккаунта?' }),
    title: 'Вход',
    ...props,
  };

  return Handlebars.compile(tmpl)(combineProps);
};
