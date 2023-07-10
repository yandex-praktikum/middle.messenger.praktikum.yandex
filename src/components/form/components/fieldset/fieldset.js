import FieldsetTemplate from './fieldset.hbs';
import './fieldset.css';

export function Fieldset({ id, label, type = 'text', value = '' }) {
  return FieldsetTemplate({ id, label, value, type });
}
