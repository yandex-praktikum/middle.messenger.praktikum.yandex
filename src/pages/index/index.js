import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import '../../../src/styles/style.scss';
import './style.scss';
import increaseIndex from '../../utils/increaseIndex.js';
import data from './data';

Handlebars.registerHelper('increaseIndex', increaseIndex);
const comp = Handlebars.compile(tpl);

const res = comp({
  links: data.links,
});

document.getElementById('app').innerHTML = res;