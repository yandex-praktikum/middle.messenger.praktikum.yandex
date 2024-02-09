import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (form) => {
  return Handlebars.compile(tpl)({ form })
}