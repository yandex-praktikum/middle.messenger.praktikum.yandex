import Handlebars from 'handlebars';
import * as Components from './Components';
import * as Pages from './Pages';
import * as Widgets from './Widgets';
import * as Features from './Features';
import * as Icons from './Icons';

const pages = {
  nav: [Pages.Nav, { pages: ['signIn', 'signUp', 'chat', 'notFount', 'serverError'] }],
  signIn: [Pages.SignIn, { test: '123' }],
  signUp: [Pages.SingUp, {}],
  chat: [Pages.Chat, {}],
  notFount: [Pages.NotFound, {}],
  serverError: [Pages.ServerError, {}],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Widgets).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Icons).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Features).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
