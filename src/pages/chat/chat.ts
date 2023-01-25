import templateApp from '../../app.hbs';
import '../../app.scss';


import templateChat from './chat.hbs';

import { listDialog } from './listDialog/listDialog';
import { currentDialog } from './currentDialog/currentDialog';

import './chat.scss';


import { exampleChatData as dialogs } from '../../../static/exampleData.json';
import { formattedDate } from '../../utils/date';


export type TDialog = {
    avatar: string,
    dialog: Array<TMessage>,
    id: string,
    lastMsg: TMessage,
    newMsg: number,
    nick: string
}

export type TMessage = {
    date: string,
    media: string,
    new: boolean,
    read: boolean,
    text: string,
    time: string,
    type: string,
}



let activeDialog: TDialog | undefined = undefined;

const dialogSorted = (dialogs: Array<TDialog>) => {
    dialogs.forEach((item, i) => {
        item.dialog.sort((msg1, msg2) => formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1);
        item.newMsg = 0;
        item.dialog.forEach(msg => msg.new ? item.newMsg++ : '');
        item.lastMsg = item.dialog[item.dialog.length - 1];
    });

    dialogs.sort((dialog1, dialog2) => formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1);
}

const chatView = (): void => templateChat({
    currentDialog: currentDialog(activeDialog),
    listDialog: listDialog(dialogs, activeDialog?.id),
});

const setActiveDialog = (dialogs: Array<TDialog>, active: string | number): TDialog | undefined => {
    for (let i = 0; i < dialogs.length; i++) {
        const item = dialogs[i];
        if (item.id === active) {
            return item;
        }
    }
    return undefined;
}
const changeCurrentDialog = (e: Event) => {
    const item = e?.target?.closest('.dialog__item');
    if (!item) return;
    const clickDialog = item.dataset.dialogId;
    if (!clickDialog || (clickDialog === activeDialog)) return;
    activeDialog = setActiveDialog(dialogs, clickDialog);
    document.body.innerHTML = templateApp({ page: chatView });
    const currentDialogElement: HTMLElement | null = document.querySelector('.current__dialog');
    if (currentDialogElement) {
        currentDialogElement.scrollBy(0, currentDialogElement.clientHeight);
    }
}




dialogSorted(dialogs);
document.body.innerHTML = templateApp({ page: chatView });
document.body.addEventListener('click', changeCurrentDialog);
