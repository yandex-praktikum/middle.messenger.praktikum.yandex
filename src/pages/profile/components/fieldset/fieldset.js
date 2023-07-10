import FieldsetTemplate from './fieldset.hbs';
import './fieldset.css';

export function Fieldset({ id, label, value = '', type = 'text', disabled }) {
  disabled = disabled ? 'disabled' : undefined;
  return FieldsetTemplate({ id, label, value, type, disabled });
}
