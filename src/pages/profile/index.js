import './prifile.scss';
import Handlebars from 'handlebars';
import { tmpl } from './profile.tmpl.js';

// Components
import { Navbar } from '../../layouts/Navbar/index.js';
import { Button } from '../../components/button/index.js';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { Link } from '../../components/link/index.js';

export const Profile = (props) => {
  const additionalProps = {
    linkEditInfo: Link({ to: '/profile-info-edit', text: 'Изменить данные' }),
    linkEditPassword: Link({ to: '/profile-password-edit', text: 'Изменить пароль' }),
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    chatName: 'Иван',
    phone: '+7 (909) 967 30 30',
    avatar,
    arrow,
  };

  const combineProps = {
    ...additionalProps,
    ...props,
  };

  return Handlebars.compile(tmpl)(combineProps);
};
