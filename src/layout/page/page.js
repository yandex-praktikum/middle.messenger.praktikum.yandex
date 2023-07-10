import PageTemplate from './page.hbs';
import './page.css';

export function Page({ children }) {
  return PageTemplate({ children });
}
