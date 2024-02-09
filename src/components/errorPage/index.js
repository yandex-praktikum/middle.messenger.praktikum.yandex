import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (img, title, link) => {
  return Handlebars.compile(tpl)({ img, title, link })
}