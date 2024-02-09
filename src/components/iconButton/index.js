import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (type) => {
  return Handlebars.compile(tpl)({ type })
}