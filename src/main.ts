import Handlebars from 'handlebars';
import { registerImports, loadImport } from './core/resgiterComponent';
import { BlockType } from './core/Block';
import { Store } from './core/Store';
import { AppState } from './type';
import { initApp } from './services/initApp';
import Router from './core/Router';

// import * as Components from './components';
// import * as Pages from "./pages";

type ImportValue = Record<string, string | BlockType>;
type ImportGlob = Record<string, ImportValue>;

const importComponents: ImportGlob = import.meta.glob('./components/**/*.ts', { eager: true });
const importPartials: ImportGlob = import.meta.glob('./partials/**/*.ts', { eager: true });
const importPages: ImportGlob = import.meta.glob('./pages/**/*.ts', { eager: true });

const pages: ImportValue = loadImport(importPages);
const components: ImportValue = loadImport(importComponents);
const partials: ImportValue = loadImport(importPartials);

registerImports(partials);
registerImports(components);

/*
Page names:
    - Page404
    - Page500
    - ChatPage
    - LoginPage
    - ProfilePage
    - RegistrationPage
*/
registerImports(pages);

Handlebars.registerHelper('getTimeToChat', (time) => {
    if (!time) return new Handlebars.SafeString('');

    const chatTime = new Date(time);
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);

    const startWeek = new Date();
    startWeek.setHours(0, 0, 0, 0);
    startWeek.setDate(0);
    let options = {};
    if (chatTime > startDay) {
        options = {
            hour: 'numeric',
            minute: 'numeric',
        };
    } else {
        options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
    }
    return new Handlebars.SafeString(chatTime.toLocaleString('ru', options));
});

Handlebars.registerHelper('getUserNameToChat', (user) => {
    if (user.displayName) {
        return new Handlebars.SafeString(user.displayName);
    }
    return new Handlebars.SafeString(`${user.secondName} ${user.firstName}`);
});

declare global {
    interface Window {
        store: Store<AppState>;
    }

    type Nullable<T> = T | null;
}

const initState: AppState = {
    error: null,
    user: null,
    isOpenDialogChat: false,
    isOpenDialogPassword: false,
    isOpenDialogChatMenu: false,
    isOpenDialogChoiceUser: false,
    chats: [],
    currentChat: null,
    currentChatUsers: [],
    searchChatUsers: [],
    loginSearch: true,
    currentChatMessages: [],
};
window.store = new Store<AppState>(initState);

const router = new Router('#app');

// Можно обновиться на /user и получить сразу пользователя
router
    .use('/', pages.ChatPage as BlockType)
    .use('/login', pages.LoginPage as BlockType)
    .use('/sign-up', pages.RegistrationPage as BlockType)
    .use('/messenger', pages.ChatPage as BlockType)
    .use('/settings', pages.ProfilePage as BlockType)
    .use('/404', pages.Page404 as BlockType)
    .use('/500', pages.Page500 as BlockType);

document.addEventListener('DOMContentLoaded', () => initApp());
