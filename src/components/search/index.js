import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (id) => {
  return Handlebars.compile(tpl)({ id })
}