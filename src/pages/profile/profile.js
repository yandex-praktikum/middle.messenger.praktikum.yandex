import { Page } from '@layout';
import { getQueryParam } from '@utilities';
import { ArrowLink, ArrowRound, Avatar, Button } from '@components';

import * as MOCK from '../../mock.json';

import { Fieldset } from './components';
import ProfileTemplate from './profile.hbs';

import './profile.css';

const infoFields = [
  { id: 'email', label: 'Почта', value: MOCK.profile.email },
  { id: 'login', label: 'Логин', value: MOCK.profile.login },
  { id: 'first_name', label: 'Имя', value: MOCK.profile.first_name },
  { id: 'second_name', label: 'Фамилия', value: MOCK.profile.second_name },
  { id: 'display_name', label: 'Имя в чате', value: MOCK.profile.display_name },
  { id: 'phone', label: 'Телефон', value: MOCK.profile.phone }
];

const passwordFields = [
  { id: 'oldPassword', label: 'Старый пароль', value: MOCK.profile.password, type: 'password' },
  { id: 'newPassword', label: 'Новый пароль', value: '', type: 'password' },
  { id: 'repeat', label: 'Повторите новый пароль', value: '', type: 'password' }
];

export function ProfilePage() {
  const state = getQueryParam('state');
  const isMainState = state !== 'edit' && state !== 'password';

  const fields = [];

  switch (state) {
    case 'edit':
      fields.push(...infoFields);
      break;
    case 'password':
      fields.push(...passwordFields);
      break;
    default:
      fields.push(...infoFields.map(field => ({ ...field, disabled: true })));
  }

  const arrowRound = ArrowRound({});
  const avatar = Avatar({ mode: 'big', hover: true });
  const fieldSets = fields.map(field => Fieldset(field));
  const backLink = ArrowLink({ label: 'Профиль', href: '/profile', reversed: true });
  const button = Button({ type: 'submit', text: 'Сохранить '});

  const profile = ProfileTemplate({ fieldSets, avatar, backLink, arrowRound, button, isMainState });

  return Page({ children: profile });
}
