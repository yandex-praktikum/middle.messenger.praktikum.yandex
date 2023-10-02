import Handlebars from 'handlebars';
import { registerComponent } from './core/resgiterComponent';
import Block, { BlockType } from './core/Block';

// import * as Components from './components';
// import * as Pages from "./pages";

type ImportValue = Record<string, string | BlockType>;
type ImportGlob = Record<string, ImportValue>;

const importComponents: ImportGlob = import.meta.glob('./components/**/*.ts', { eager: true });
const importPartials: ImportGlob = import.meta.glob('./partials/**/*.ts', { eager: true });
const importPages: ImportGlob = import.meta.glob('./pages/**/*.ts', { eager: true });

const loadImport = (importGlob: ImportGlob): ImportValue => {
    const result: ImportValue = {};
    Object.keys(importGlob).forEach((path: string) => {
        Object.keys(importGlob[path]).forEach((name: string) => {
            result[name] = importGlob[path][name];
        });
    });
    return result;
};

const pages: ImportValue = loadImport(importPages);
const components: ImportValue = loadImport(importComponents);
const partials: ImportValue = loadImport(importPartials);

const registerImports = (imports: ImportValue) => {
    Object.keys(imports).forEach((name:string) => {
        const value = imports[name];
        if (typeof value === 'string') {
            Handlebars.registerPartial(name, value);
        } else {
            registerComponent(name, value);
        }
    });
};

registerImports(partials);
registerImports(components);
registerImports(pages);

/**
 * Page change function
 *  @param page {string} -  The name of the page, for example, LoginPage,
 *                          is taken from the export in the js files of the pages
 */
const navigate = (page: string) => {
    if (pages[page]) {
        const app = document.getElementById('app');
        if (app) {
            // root.innerHTML = Handlebars.compile(pages[page])(data);

            const Component = pages[page];
            if (typeof Component !== 'string') {
                const component: Block = new Component({});
                const content = component.getContent();
                if (content !== null) {
                    app.innerHTML = '';
                    app.append(content);
                }
            } else {
                const content = Handlebars.compile(pages[page])({});
                if (content !== null) {
                    app.innerHTML = content;
                }
            }
        }
    }
};

/*
Page names:
    - Page404
    - Page500
    - ChatPage
    - LoginPage
    - ProfilePage
    - RegistrationPage
*/
document.addEventListener('DOMContentLoaded', () => navigate('ChatPage'));

// Automatic transition to the page if the button has the page attribute
document.addEventListener('click', (e) => {
    const target: HTMLElement = e.target as HTMLElement;
    const page = target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
