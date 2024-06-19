import Handlebars from 'handlebars';
export { default as ListNameChat } from './listNameChat.hbs?raw';

Handlebars.registerHelper( 'chats-list', () => {
    return [
        { name: 'User1', lastMesage: 'hi', timeLastMessage: '02:12', unreadMessage: '4', ava: ''},
        { name: 'User2', lastMesage: 'hi', timeLastMessage: '12:12', unreadMessage: '1', 
            ava: '', className: 'active'},
            { name: 'User1', lastMesage: 'hi', timeLastMessage: '02:12', unreadMessage: '4', ava: ''},
        { name: 'User2', lastMesage: 'hi', timeLastMessage: '12:12', unreadMessage: '1', 
            ava: '' },
        { name: 'User3', lastMesage: 'hi-hi', timeLastMessage: '13:01', unreadMessage: '2', ava: ''},
        { name: 'User4', lastMesage: 'hi', timeLastMessage: '07:12', unreadMessage: '5', ava: ''},
        { name: 'User5', lastMesage: 'hi', timeLastMessage: '05:11', unreadMessage: '7', ava: ''},
        { name: 'User6', lastMesage: 'hi', timeLastMessage: '03:25', unreadMessage: '2', ava: ''},
        { name: 'User1', lastMesage: 'hi', timeLastMessage: '02:12', unreadMessage: '4', ava: ''},
        { name: 'User2', lastMesage: 'hi', timeLastMessage: '12:12', unreadMessage: '1', 
            ava: ''}
    ]
});
