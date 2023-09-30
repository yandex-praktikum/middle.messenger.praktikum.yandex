import './profile-password-edit.scss';
import Handlebars from 'handlebars';
import { tmpl } from './profile-password-edit.tmpl.js';
import { Button } from '../../components/button/index.js';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';

export const ProfilePasswordEdit = (props) => {
  const additionalProps = {
    button: Button({ type: 'submit', text: 'Сохранить' }),
    oldPassword: '123456789',
    newPassword: '123456789qwe',
    confirmPassword: '123456789qwe',
    avatar,
    arrow,
  };

  const combineProps = {
    ...additionalProps,
    ...props,
  };

  return Handlebars.compile(tmpl)(combineProps);
};
