import templateListDialogs from './listDialog.hbs';
import templateListItem from './listItem.hbs';

import link from '../../../components/link/link';
import input from '../../../components/form/input/input';
import avatarDefault from '../../../assets/icon/avatar_default.png';

import './listDialog.scss';
import { getDateLastMessage } from '../../../utils/date';
import { sliceLastMessage } from '../../../utils/text';
import { TDialog } from '../chat';


const search: string = input({
    placeholder: 'Поиск', textLabel: '<i class="fa fa-search"></i>', type: 'search', labelClass: 'search',
});
const profileLink: string = link({ href: '/profile', label: 'Профиль >' });


export const listDialog = (data: Array<TDialog>, active: undefined | string | number = 0): string => {
    let dialogs = '';
    data.forEach((item) => {
        dialogs += templateListItem({
            avatar: item.avatar ? item.avatar : avatarDefault,
            dialogId: item.id,
            nickname: item.nick,
            lastMessage: sliceLastMessage(item.lastMsg.text, item.lastMsg.type),
            timeLastMessage: getDateLastMessage(item.lastMsg),
            countNewMessage: item.newMsg ? `<div>${item.newMsg}</div>` : '',
            itemClass: item.id === active ? 'active' : '',
        });
    });
    return templateListDialogs({ dialogs, controls: profileLink + search });
};
