import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import '../../../src/styles/style.scss';
import errorPage from '../../components/errorPage';
import data from './data';

const comp = Handlebars.compile(tpl);

const res = comp({
  page: errorPage(data.img, data.title, data.link)
});

document.getElementById('app').innerHTML = res;
