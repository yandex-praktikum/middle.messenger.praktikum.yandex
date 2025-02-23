import Handlebars from 'handlebars';
import './list-chatmy.css';

export {default as ListChatmy} from './list-chatmy.hbs?raw';




Handlebars.registerHelper('cardList', ()=>{
    return [{nameuser: 'ЕГОР', messageTime:'Вчера 16:00',messageText: 'Привет Как дела?'}, 
            {nameuser: 'Вадим', messageTime:'Вчера, 17:00',messageText: 'Все лучше чем у всех. Спринт пишу.'},
            {nameuser: 'Егор', messageTime:'Вчера, 17:15',messageText: 'Молодец'}, 
            {nameuser: 'Вадим', messageTime:'Вчера, 17:20',messageText: 'Стараемся не завалить'}
    ]
})