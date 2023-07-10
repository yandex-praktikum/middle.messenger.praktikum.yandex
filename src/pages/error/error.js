import { Page } from '@layout';

import ErrorTemplate from './error.hbs';
import './error.css';

export function ErrorPage({ status }) {
  const text = status === 404 ? 'Данной страницы не существует' : 'Мы уже фиксим проблему...';
  const error = ErrorTemplate({ status, text });

  return Page({ children: error });
}
