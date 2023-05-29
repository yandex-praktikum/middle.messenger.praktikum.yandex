import templateApp from '../../app.hbs';
import '../../app.scss';


import templateProfile from './profile.hbs';
import link from '../../components/link/link';
import list from '../../components/list/list';
import button from '../../components/button/button';
import appForm from '../../components/form/form.js';
import input from '../../components/form/input/input.js';
import avatar from '../../assets/icon/avatar_default.png';
import './profile.scss';


import { exampleProfileData } from '../../../static/exampleData.json';




const items = Object.values(exampleProfileData).map(item => {
    return `<span class="label">${item['label']}</span><span class="value">${item['value']}</span>`
});

const formItems = Object.keys(exampleProfileData).map(key => {
    return input({
        id: key,
        name: key,
        textLabel: exampleProfileData[key]['label'],
        type: 'text',
        defaultValue: exampleProfileData[key]['value'],
    })
});


const formButtons = [
    button({
        id: '',
        className: '',
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
    id: 'btn-edit-data',
    className: 'btn-small',
    label: 'Изменить данные'
})}${button({
    id: 'btn-edit-pass',
    className: 'btn-small',
    label: 'Изменить пароль'
})} ${button({
    id: '',
    className: 'btn-small',
    label: 'Выйти'
})}
    `;

const backlink = link({
    href: '/index.html',
    className: 'btn arrowprev',
    label: ''
})

const profileView = templateProfile({
    backlink,
    avatarImg: avatar,
    avatarChange: input({ type: 'file', name: 'avatar',textLabel:'Поменять аватар',labelClass:'avatar__change' }),
    data: list({ items }),
    buttons: profileButtonsView
});

const profileEdit = templateProfile({
    backlink,
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
    backlink,
    avatar: avatar,
    data: appForm({
        attr: {},
        formTitle: 'Изменение пароля',
        formItems: [
            input({
                id: 'oldPassword',
                name: 'oldPassword',
                textLabel: 'Старый пароль',
                type: 'password',
                placeholder: '******'
            }),
            input({
                id: 'newPassword',
                name: 'newPassword',
                textLabel: 'Новый пароль',
                type: 'password',
                placeholder: '******'
            }),
            input({
                id: 'newPassword2',
                name: 'newPassword2',
                textLabel: 'Повторите новый пароль',
                type: 'password',
                placeholder: '******'
            })
        ],
        formButtons

    }),
    buttons: ''
});



document.body.addEventListener('click', (e) => {
    if (e.target.id === 'btn-edit-data') {
        document.body.innerHTML = templateApp({ page: profileEdit });
    } else if (e.target.id === 'btn-edit-pass') {
        document.body.innerHTML = templateApp({ page: profilePassEdit });
    }
});



document.body.innerHTML = templateApp({ page: profileView });
