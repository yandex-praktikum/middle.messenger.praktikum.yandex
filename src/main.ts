import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

console.log('temp: ', Pages.ListPages);

const pages = {
  'login': [Pages.LoginPage, { test: '12345' }],
  'nav': [Pages.NavigatePage],
  'signup': [Pages.SignupPage],
  'list': [Pages.ListPages],
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

  console.log('html', templatingFunction(context));

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

// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
