import templateListDialogs from './listDialog.hbs';
import templateListItem from './listItem.hbs';

import link from '../../../ui/link/link';
import input from '../../../ui/form/input/input';

import './listDialog.scss';

const search = input({ placeholder: "Поиск" });
const profileLink = link({ href: '/profile', label: 'Профиль >' })

export const listDialog = (data, active) => {
    let dialogs = '';
    data.forEach(item => {
        dialogs += templateListItem({
            avatar: 'https://breakthroughsolutions.com/wp-content/uploads/2017/02/testimonial-e1488049467378.png',
            nickname: item.nick,
            lastMessage: item.lastMsg.text,
            timeLastMessage: item.lastMsg.time,
            countNewMessage: 0
        })
    });


    return templateListDialogs({ dialogs, controls: profileLink + search });


}

