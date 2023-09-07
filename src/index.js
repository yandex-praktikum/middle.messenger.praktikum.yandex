import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template)
})

console.log(Pages);

const pages = {
  'login': Pages.pageLogin,
  'signin': Pages.pageSignin,
  'profile': Pages.pageProfile,
  'chat': Pages.pageChat,
  '404': Pages.page404,
  '500': Pages.page500,
}

function navigate(page) {
  const source = pages[page];
  const render = Handlebars.compile(source);

  const appDiv = document.querySelector('#app');
  if (appDiv) {
    appDiv.innerHTML = render();
  }
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', (e) => {
  e.preventDefault;

  const page = e.target.getAttribute('page');
  
  if (page) {
    navigate(page);
  }
})
