import Handlebars from 'handlebars';
import {template} from './chats.tmpl.js'
import ChatItem from "../../components/ChatItem/index.js";
import Input from "../../components/Input/index.js";
import Avatar from "../../components/Avatar/index.js";
import logoUrl from "../../assets/icons/ocean-logo.svg";
import settingUrl from "../../assets/icons/settings.svg";
import './chats.scss';

export const Chats = () => Handlebars.compile(template)({
    logoUrl,
    inputSearch: `${Input({type: 'text', name: 'search_chat', placeholder: 'Поиск' })}`,
    avatar: `${Avatar({url: 'https://aniyuki.com/wp-content/uploads/2022/02/quotes-from-attack-on-titan-characters-5.jpg'})}`,
    settingUrl,
    chats: `
    ${ChatItem({
        avatarUrl: 'https://opis-cdn.tinkoffjournal.ru/ip/Rz0JQ5Xo25uY8YKWJqwyKYow-HRTMzRgh2tFg2GdIiY/w:1200/aHR0cHM6Ly9vcGlz/LWNkbi50aW5rb2Zm/am91cm5hbC5ydS9t/ZXJjdXJ5L29zaGkt/bm8ta28taW4uaXV6/NGx0dHBlaHZ4Li5q/cGc',
        chatName: 'chatName',
        lastTime: '18:20',
        message: 'Какое-то сообщение сообщение сообщение сообщение сообщение'
    })}
    ${ChatItem({
        avatarUrl: 'https://cdn.kanobu.ru/articles/pics/fefe82c4-806c-4c6a-a729-9cb047a25b0a.webp',
        chatName: 'chatName2',
        lastTime: '18:00',
        message: 'Какое-то сообщение сообщение сообщение сообщение сообщение'
    })}
    ${ChatItem({
        avatarUrl: 'https://pibig.info/uploads/posts/2021-04/1619309586_9-pibig_info-p-anime-ataka-titanov-levi-anime-krasivo-9.jpg',
        chatName: 'chatName3',
        lastTime: '17:20',
        message: 'Какое-то сообщение'
    })}
    ${ChatItem({
        avatarUrl: 'https://pibig.info/uploads/posts/2021-04/1619309586_9-pibig_info-p-anime-ataka-titanov-levi-anime-krasivo-9.jpg',
        chatName: 'chatName3',
        lastTime: '17:20',
        message: 'Какое-то сообщение'
    })}
    ${ChatItem({
        avatarUrl: 'https://pibig.info/uploads/posts/2021-04/1619309586_9-pibig_info-p-anime-ataka-titanov-levi-anime-krasivo-9.jpg',
        chatName: 'chatName3',
        lastTime: '17:20',
        message: 'Какое-то сообщение'
    })}
    ${ChatItem({
        avatarUrl: 'https://pibig.info/uploads/posts/2021-04/1619309586_9-pibig_info-p-anime-ataka-titanov-levi-anime-krasivo-9.jpg',
        chatName: 'chatName3',
        lastTime: '17:20',
        message: 'Какое-то сообщение'
    })}
    `
});
