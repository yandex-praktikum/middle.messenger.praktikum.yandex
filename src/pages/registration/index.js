import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import '../../../src/styles/style.scss';
import './style.scss';
import form from '../../components/form';
import data from './data';

const comp = Handlebars.compile(tpl);

const res = comp({
  image: data.image,
  form: form(data.form),
});

document.getElementById('app').innerHTML = res;