import Handlebars from 'handlebars';

import * as Components from './Components';
// eslint-disable-next-line import/no-named-default
import { default as ModalRaw } from './Components/modal/modal.hbs?raw';
import * as Features from './Features';
import * as Icons from './Icons';
import { navigate } from './services/Navigate';
import { registerComponent } from './services/RegisterComponent';
import * as Widgets from './Widgets';

Object.entries(Components).forEach(([name, component]) => {
  return registerComponent(name, component);
});

Object.entries(Widgets).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Icons).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerPartial('Modal', ModalRaw);

Object.entries(Features).forEach(([name, component]) => {
  return registerComponent(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('nav'));
