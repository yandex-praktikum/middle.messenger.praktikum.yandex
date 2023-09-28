import './button.scss';
import Handlebars from 'handlebars';
import { tmpl } from './button.tmpl.js';

export const Button = (props) => {
  return Handlebars.compile(tmpl)(props);
};
