import Handlebars from 'handlebars';
import Avatar from "../Avatar";
import './chatItem.scss';

export const ChatItem = ({avatarUrl, chatName, lastTime, message}) => Handlebars.compile(`
    <div class="chat-item">
        <div class="chat-item__avatar">
            ${Avatar({url: avatarUrl})}
        </div>
        <div class="chat-item__info">
            <div class="chat-item__header"><p class="chat-item__chat-name">${chatName}</p><span class="chat-item__time">${lastTime}</span></div>
            <p class="chat-item__message">${message}</p>
        </div>
    </div>
`)();
