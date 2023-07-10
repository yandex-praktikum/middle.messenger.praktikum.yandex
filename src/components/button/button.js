import ButtonTemplate from './button.hbs';
import './button.css';

export function Button({ type = 'button', text }) {
  return ButtonTemplate({ type, text });
}
