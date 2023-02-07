import templateListDialogs from './dialogList.hbs';
import Block, { TProps } from '../../classes/Block';
import { TDialog } from '../../pages/chat/chat';
import { formattedDate, getDateLastMessage } from '../../utils/date';
import { sliceLastMessage } from '../../utils/text';
import avatarDefault from '../../assets/icon/avatar_default.png';
import './dialogList.scss';

export default class DialogsList extends Block {
    constructor(props: TProps) {
        super('div', props, templateListDialogs)
    }

    dialogListCompile(dialogs: Array<TDialog> = []): Array<TDialog> | [] {
        const compilesDialogs = [];
        dialogs.forEach((item, key) => {
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarDefault,
                dialogId: item.id,
                nick: item.nick,
                lastMessage: sliceLastMessage(item.lastMsg.text, item.lastMsg.type),
                timeLastMessage: getDateLastMessage(item.lastMsg),
                countNewMessage: item.newMsg,
                itemClass: item.id === this.props.active ? 'active' : '',
            })
        });
        return compilesDialogs;
    }

    render() {
        const dialogs = this.dialogListCompile(this.props.dialogs);
        return this.compile({ ...this.props, dialogs });
    }
}


