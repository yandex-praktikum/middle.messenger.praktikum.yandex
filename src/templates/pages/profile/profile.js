import templateApp from '../../app.hbs';
import '../../app.scss';


import templateProfile from './profile.hbs';
import link from '../../ui/link/link';
import list from '../../ui/list/list';
import button from '../../ui/button/button';
import appForm from '../../ui/form/form.js';
import input from '../../ui/form/input/input.js';
import avatar from '../../../assets/icon/avatar_default.png';
import './profile.scss';

// const exampleData = {
//     "Почта": "pochta@yandex.ru",
//     "Логин": "ivanivanov",
//     "Имя": "Иван",
//     "Фамилия": "Иванов",
//     "Имя в чате": "Иван",
//     "Телефон": "+7 (909) 967 30 30",
// };

const exampleData = { 
    'email':{
        'label':'Почта',
        'value':'pochta@yandex.ru'
    },
    'login':{
        'label':'Логин',
        'value':'ivanivanov'
    },
    'first name':{
        'label':'Имя',
        'value':'Иван'
    },
    'last name':{
        'label':'Фамилия',
        'value':'Иванов'
    },
    'display_name':{
        'label':'Имя в чате',
        'value':'Иван'
    },
    'phone':{
        'label':'Телефон',
        'value':'+7 (909) 967 30 30'
    },
    
}

const items = Object.values(exampleData).map(item => {
    return `<span class="label">${item['label']}</span><span class="value">${item['value']}</span>`
});

const formItems = Object.keys(exampleData).map(key => {
    return input({
        id:key,
        name:key,
        textLabel:exampleData[key]['label'],
        type:'text',
        defaultValue:exampleData[key]['value'],
    })
});


const formButtons = [
    button({
        id: '',
        className: '',
        onClick: alert,
        label: 'Сохранить'
    }),
    button({
        id: '',
        className: '',
        label: 'Отменить'
    })

];

const profileButtonsView = `
    ${button({
    id: '',
    className: 'btn-small',
    label: 'Изменить данные'
})}${button({
    id: '',
    className: 'btn-small',
    label: 'Изменить пароль'
})} ${button({
    id: '',
    className: 'btn-small',
    label: 'Выйти'
})}
    `;


export const profileView = templateProfile({
    backlink: link({
        href: '/chat.html',
        className: 'btn arrowprev',
        label: ''
    }),
    avatar: avatar,
    data: list({ items }),
    buttons: profileButtonsView
});

const profileEdit = templateProfile({
    backlink: link({
        href: '/chat.html',
        className: 'btn arrowprev',
        label: ''
    }),
    avatar: avatar,
    data: appForm({
        attr: {},
        formTitle: 'Изменение регистрационных данных',
        formItems,
        formButtons

    }),
    buttons: ''
});
const profilePassEdit = templateProfile({
    backlink: link({
        href: '/chat.html',
        className: 'btn arrowprev',
        label: ''
    }),
    avatar: avatar,
    data: appForm({
        attr: {},
        formTitle: 'Изменение пароля',
        formItems:[
            input({
                id:'oldPassword',
                name:'oldPassword',
                textLabel:'Старый пароль',
                type:'password',
                placeholder:'******'
            }),
            input({
                id:'newPassword',
                name:'newPassword',
                textLabel:'Новый пароль',
                type:'password',
                placeholder:'******'
            }),
            input({
                id:'newPassword2',
                name:'newPassword2',
                textLabel:'Повторите новый пароль',
                type:'password',
                placeholder:'******'
            })
        ],
        formButtons

    }),
    buttons: ''
});




document.body.innerHTML = templateApp({ page: profileView });
document.body.innerHTML = templateApp({ page: profileEdit });
document.body.innerHTML = templateApp({ page: profilePassEdit });
