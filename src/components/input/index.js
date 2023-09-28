import './input.scss';
import Handlebars from 'handlebars';
import { tmpl } from './input.tmpl.js';

export const Input = (props) => {
  return Handlebars.compile(tmpl)(props);
};
