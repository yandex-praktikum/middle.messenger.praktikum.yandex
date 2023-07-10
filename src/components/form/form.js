import { Button } from '@components';

import FormTemplate from './form.hbs';
import { Fieldset } from './components';
import './form.css';

export function Form({
  fields,
  title,
  buttonText,
  linkHref,
  linkText
}) {
  const fieldSets = fields.map(field => Fieldset(field));
  const button = Button({ type: 'submit', text: buttonText });

  return FormTemplate({ fieldSets, title, button, linkHref, linkText });
}
