import templateApp from '../../app.hbs';
import '../../app.scss';


import templateChat from './chat.hbs';

import { listDialog } from './listDialog/listDialog';
import { currentDialog } from './currentDialog/currentDialog';

import './chat.scss';


import { exampleChatData as dialogs } from '../../../static/exampleData.json';
import { formattedDate } from '../../utils/date';

let activeDialog = {};

const dialogSorted = (dialogs) => {
    dialogs.forEach((item, i) => {
        item.dialog.sort((msg1, msg2) => formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1);
        item.newMsg = 0;
        item.dialog.forEach(msg => msg.new ? item.newMsg++ : '');
        item.lastMsg = item.dialog[item.dialog.length - 1];
    });

    dialogs.sort((dialog1, dialog2) => formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1);
}

const chatView = () => templateChat({
    currentDialog: currentDialog(activeDialog),
    listDialog: listDialog(dialogs, activeDialog.id),
});

const setActiveDialog = (dialogs, active) => {
    for (let i = 0; i < dialogs.length; i++) {
        const item = dialogs[i];
        if (item.id === active) {
            return item;
        }
    }
}
const changeCurrentDialog = (e) => {
    const item = e.target.closest('.dialog__item');
    if (!item) return;
    const clickDialog = item.dataset.dialogId;
    if (!clickDialog || (clickDialog === activeDialog)) return;
    activeDialog = setActiveDialog(dialogs, clickDialog);
    document.body.innerHTML = templateApp({ page: chatView });
    document.querySelector('.current__dialog ').scrollBy(0, document.querySelector('.current__dialog ').clientHeight);
}




dialogSorted(dialogs);
document.body.innerHTML = templateApp({ page: chatView });
document.body.addEventListener('click', changeCurrentDialog);
