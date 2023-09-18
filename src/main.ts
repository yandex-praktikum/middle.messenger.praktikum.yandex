import './styles/main.css';
import * as Components from './components';
import * as Pages from './pages';
import {mockUser} from "./mocks/user-profile.mocks";
import {chat1, mockListChats} from "./mocks/chat.mocks";
import {message1, mockListMessages} from "./mocks/chat-message.mocks";
import {registerComponent} from "./utils/registerComponents";

const allComponents={
    'Button': Components.Button,
    'Avatar': Components.Avatar,
    'ChatItem': Components.ChatItem,
    'ChatList': Components.ChatList,
    'Badge': Components.Badge,
    'Error': Components.Error,
    'Input': Components.Input,
    'InputShort': Components.InputShort,
    'InputWide': Components.InputWide,
    'InputSearch': Components.InputSearch,
    'Loader': Components.Loader,
    'Message': Components.Message,
    'MessageList': Components.MessageList,
    'Modal': Components.Modal,
    'FormAuth': Components.FormAuth,
    'LoginPage': Pages.LoginPage,
    'Link': Components.Link
}
const pages = {
    "allComponents": {component:Pages.AllComponentsPage,props: {
        chat1: chat1,
        chatList: mockListChats,
        message: message1,
        messageList: mockListMessages,
        currentUser: mockUser
    }},
    "allPages": {component:Pages.AllPages},
    "loginPage": {component:Pages.LoginPage},
    "pageRegistration": {component:Pages.PageRegistration},

/*
    "pageProfile": [Pages.PageProfile, {user: mockUser}],
    "pageProfileEdit": [Pages.PageProfileEdit, {user: mockUser}],
    "pagePasswordEdit": [Pages.PagePasswordEdit, {user: mockUser}],
    "pageChat": [Pages.PageChat, {chatList: mockListChats, messageList: mockListMessages, currentUser: mockUser}],
    "page500": [Pages.Page500],
    "page404": [Pages.Page404],*/

};

Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});

const navigate = (page: string) => {
    const app = document.getElementById('app');

/*
    if(page !== 'allComponents') {
        const container = document.getElementById('app')!;
        // @ts-ignore
        container.innerHTML = Handlebars.compile(pages[page])({});
        return;
    }
*/

    // @ts-ignore
    const Component = pages[page].component;
    // @ts-ignore
    const props = pages[page].props||{};
    const component = new Component(props);
    const htmlElement=component.getContent();
    if( !app?.firstElementChild)    app?.append(document.createElement('div') );
    app?.firstElementChild?.replaceWith(htmlElement);
}
document.addEventListener('DOMContentLoaded', () => navigate('allPages'));
document.addEventListener('click', (e:Event) => {
    if(!e)return;
    // @ts-ignore
    const page = e.target?.getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
/*Handlebars.registerHelper("imageUrl", function (options) {
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
});*/



