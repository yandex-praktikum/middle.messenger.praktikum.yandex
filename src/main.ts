import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [Pages.LoginPage, { test: '12345' }],
  'nav': [Pages.NavigatePage],
  'signup': [Pages.SignupPage],
  'chatmy': [Pages.ChatMy],
  'page404': [Pages.Page404],
  'page500': [Pages.Page500],
}

Object.entries(Components).forEach(([name, component]) => {

  Handlebars.registerPartial(name, component);

});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  const templatingFunction = Handlebars.compile(source);

  container.innerHTML = templatingFunction(context);
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
