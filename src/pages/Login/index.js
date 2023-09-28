import './login.scss';
import Handlebars from 'handlebars';
import { tmpl } from './login.tmpl.js';

// Components
import { Button } from '../../components/button/index.js';
import { Input } from '../../components/input/index.js';
import { Link } from '../../components/link/index.js';

export const Login = (props) => {
  const inputs = {
    inputLogin: Input({ type: 'text', label: 'Логин' }),
    inputPassword: Input({ type: 'password', label: 'Пароль' }),
  };

  const combineProps = {
    ...props,
    ...inputs,
    button: Button({ text: 'Авторизоваться' }),
    link: Link({ to: '/', text: 'Нет аккаунта?' }),
  };

  return Handlebars.compile(tmpl)(combineProps);
};
