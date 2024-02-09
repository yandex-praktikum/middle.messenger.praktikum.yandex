import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import '../../../src/styles/style.scss';
import './style.scss';
import iconButton from '../../components/iconButton';
import userConfig from '../../config/user';
import data from './data';

const comp = Handlebars.compile(tpl);

const res = comp({
  user: userConfig,
  fields: data.fields,
  control: data.control,
  imageButton: iconButton('image'),
});

document.getElementById('app').innerHTML = res;
