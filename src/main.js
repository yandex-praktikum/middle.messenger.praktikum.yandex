import Handlebars from 'handlebars';

// Stores all component data
import data from './data.json';

//import * as Components from './components';
//import * as Pages from "./pages";

const importComponents = import.meta.glob('./components/**/*.js', { eager: true });
const importPages = import.meta.glob('./pages/**/*.js', { eager: true });

const pages = {};
for (const path in importPages) {
    for (const name in importPages[path]) {
        pages[name]=importPages[path][name];
    }
}

let components = {};
for (const path in importComponents) {
    for (const name in importComponents[path]) {
        components[name]=importComponents[path][name];
    }
}

Object.entries(components).forEach(([name, component])=>Handlebars.registerPartial(name,component));

/**
 * Page change function
 * @param page {String} - The name of the page, for example, LoginPage, is taken from the export in the js files of the pages
 */
const navigate = (page) => {
    if (pages[page]) {
        const root = document.querySelector('#app');
        root.innerHTML = Handlebars.compile(pages[page])(data);
    }
}

/*
Page names:
    - Page404
    - Page500
    - ChatPage
    - LoginPage
    - ProfilePage
    - RegistrationPage
*/
document.addEventListener('DOMContentLoaded', ()=>navigate('ChatPage'));

// Automatic transition to the page if the button has the page attribute
document.addEventListener('click', e=>{
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
})
