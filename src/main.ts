import './styles/main.css';
// @ts-ignore
import Handlebars from 'handlebars';
// @ts-ignore
import * as Components from './components';
// @ts-ignore
import * as Pages from './pages';
import {mockUser} from "./mocks/user-profile.mocks";
import {chat1, mockListChats} from "./mocks/chat.mocks";
import {message1, mockListMessages} from "./mocks/chat-message.mocks";
import {urlImages} from "./config";

const pages = {
    "allComponents": [Pages.AllComponentsPage, {
        chat1: chat1,
        chatList: mockListChats,
        message: message1,
        messageList: mockListMessages,
        currentUser: mockUser
    }],
    "loginPage": [Pages.PageLogin],
    "pageRegistration": [Pages.PageRegistration],
    "pageProfile": [Pages.PageProfile, {user: mockUser}],
    "pageProfileEdit": [Pages.PageProfileEdit, {user: mockUser}],
    "pagePasswordEdit": [Pages.PagePasswordEdit, {user: mockUser}],
    "pageChat": [Pages.PageChat, {chatList: mockListChats, messageList: mockListMessages, currentUser: mockUser}],
    "page500": [Pages.Page500],
    "page404": [Pages.Page404],
    "allPages": [Pages.AllPages]
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
document.addEventListener('DOMContentLoaded', () => navigate('allPages'));
document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
// @ts-ignore
Handlebars.registerHelper("imageUrl", function (options) {
    const attrs = Object.keys(options.hash)
        .map(function (key) {
            if (key === 'src') {
                const imgUrl = new URL(urlImages + options.hash[key], import.meta.url).href;
                return key + '="' + imgUrl + '"';
            }
            return key + '="' + options.hash[key] + '"';
        })
        .join(" ");

    return (
        "<img " +
        attrs +
        ">" + "</>"
    );
});

