import templateListDialogs from './listDialog.hbs';
import templateListItem from './listItem.hbs';

import link from '../../../ui/link/link';
import input from '../../../ui/form/input/input';

import './listDialog.scss';
import { getDateLastMessage } from '../../../../utils/date';
import { sliceLastMessage } from '../../../../utils/text';

const search = input({ placeholder: 'Поиск', textLabel: '<i class="fa fa-search"></i>', type: 'search', labelClass: 'search' });
const profileLink = link({ href: '/profile', label: 'Профиль >' })

export const listDialog = (data, active = 0) => {
    let dialogs = '';
    data.forEach(item => {

        dialogs += templateListItem({
            avatar: 'https://breakthroughsolutions.com/wp-content/uploads/2017/02/testimonial-e1488049467378.png',
            dialogId: item.id,
            nickname: item.nick,
            lastMessage: sliceLastMessage(item.lastMsg.text, item.lastMsg.type),
            timeLastMessage: getDateLastMessage(item.lastMsg),
            countNewMessage: item.newMsg ? `<div>${item.newMsg}</div>` : '',
            itemClass: item.id === active ? 'active':''
        })

    });


    return templateListDialogs({ dialogs, controls: profileLink + search });


}




