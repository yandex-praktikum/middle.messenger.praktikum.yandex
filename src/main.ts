import './styles/main.css';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import {mockUser} from "./mocks/user-profile.mocks";
import {chat1, mockListChats} from "./mocks/chat.mocks";
import {message1,  mockListMessages} from "./mocks/chat-message.mocks";

const pages = {
    "allComponents": [Pages.AllComponentsPage,{chat1:chat1,chatList:mockListChats,message:message1,messageList:mockListMessages,currentUser:mockUser}],
    "loginPage": [Pages.PageLogin],
    "pageRegistration": [Pages.PageRegistration],
    "pageProfile": [Pages.PageProfile,{user:mockUser}],
    "pageProfileEdit": [Pages.PageProfileEdit,{user:mockUser}],
    "pagePasswordEdit": [Pages.PagePasswordEdit,{user:mockUser}],
    "pageChat": [Pages.PageChat,{chatList:mockListChats,messageList:mockListMessages,currentUser:mockUser}],
    "page500": [Pages.Page500],
    "page404": [Pages.Page404]
};
Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

const navigate = (page: string) => {
    //@ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('allComponents'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});