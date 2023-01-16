
import ctrlTopTemplate from './controlsTop.hbs';
import ctrlBotTemplate from './controlsBottom.hbs';


import { dialogWindow } from './dialogWindow/dialogWindow';

import avatarDefault from '../../../assets/icon/avatar_default.png';

import './currentDialog.scss'
import input from '../../../components/form/input/input';
import button from '../../../components/button/button';




export const currentDialog = (dialog) => {

    if (!Object.keys(dialog).length) return '<div class="dialog_empty">Выберите чат чтобы отправить сообщение</div>';

    const ctrlTop = ctrlTopTemplate({
        avatar: dialog.avatar ? dialog.avatar : avatarDefault,
        nick: dialog.nick,
        btn: button({ className: 'ellipsis' })
    })
    const ctrlBot = ctrlBotTemplate({
        inc: button({ className: 'inc' }),
        input: input({ placeholder: 'Сообщение', name: 'message' }),
        submit: button({ className: 'arrownext' })
    })

    const dialogWin = dialogWindow(dialog.dialog);



    return ctrlTop+dialogWin+ctrlBot;

}
