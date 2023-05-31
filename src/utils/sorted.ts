/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { TDialog } from '../pages/chat/chat';
import { formattedDate } from './date';

// eslint-disable-next-line import/prefer-default-export
export const dialogSorted = (dialogs: Array<TDialog>): void => {
    dialogs.forEach((item) => {
        item.dialog.sort((msg1, msg2) => (formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1));
        item.newMsg = 0;
        item.dialog.forEach((msg) => (msg.new ? item.newMsg += 1 : ''));
        item.lastMsg = item.dialog[item.dialog.length - 1];
    });
    dialogs.sort((dialog1, dialog2) => (formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1));
};
