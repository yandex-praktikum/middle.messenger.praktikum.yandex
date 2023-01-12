import templateApp from '../../app.hbs';
import '../../app.scss';


import templateChat from './chat.hbs';

import { listDialog } from './listDialog/listDialog';

import link from '../../ui/link/link';
import list from '../../ui/list/list';
import button from '../../ui/button/button';
import appForm from '../../ui/form/form.js';
import input from '../../ui/form/input/input.js';
import avatar from '../../../assets/icon/avatar_default.png';
import './chat.scss';


import { exampleChatData as dialogs } from '../../../../exampleData.json';



dialogs.forEach((item, i) => {
    item.dialog.sort((msg1, msg2) => new Date(`${msg1.date} ${msg1.time}`).getTime() > new Date(`${msg2.date} ${msg2.time}`).getTime() ? 1 : -1);
    item.lastMsg = item.dialog[item.dialog.length - 1];
});

dialogs.sort((dialog1, dialog2) => new Date(`${dialog1.lastMsg.date} ${dialog1.lastMsg.time}`).getTime() > new Date(`${dialog2.lastMsg.date} ${dialog2.lastMsg.time}`).getTime() ? 1 : -1);




const test = listDialog(dialogs);

const profileView = templateChat({
    currentDialog: 'current',
    listDialog: test
});




// document.body.addEventListener('click', (e) => {
//     if (e.target.id === 'btn-edit-data') {
//         document.body.innerHTML = templateApp({ page: profileEdit });
//     } else if (e.target.id === 'btn-edit-pass') {
//         document.body.innerHTML = templateApp({ page: profilePassEdit });
//     }
// });



document.body.innerHTML = templateApp({ page: profileView });

