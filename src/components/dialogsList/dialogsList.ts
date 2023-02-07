import templateListDialogs from './dialogList.hbs';
import Block, { TProps } from '../../classes/Block';
import { TDialog } from '../../pages/chat/chat';
import { getDateLastMessage } from '../../utils/date';
import { sliceLastMessage } from '../../utils/text';
import avatarDefault from '../../assets/icon/avatar_default.png';
import './dialogList.scss';

type TDialogItem = {
    avatar: string,
    dialogId: string,
    nick: string,
    lastMessage: string,
    timeLastMessage: string,
    countNewMessage: string | number,
    itemClass: string,
}
export default class DialogsList extends Block {
    constructor(props: TProps) {
        super('div', props, templateListDialogs);
    }

    dialogListCompile(dialogs: Array<TDialog> = []): Array<TDialogItem> | [] {
        const compilesDialogs: Array<TDialogItem> | undefined = [];
        dialogs.forEach((item) => {
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarDefault,
                dialogId: item.id,
                nick: item.nick,
                lastMessage: sliceLastMessage(item.lastMsg.text, item.lastMsg.type),
                timeLastMessage: getDateLastMessage(item.lastMsg),
                countNewMessage: String(item.newMsg),
                itemClass: item.id === this.props.active ? 'active' : '',
            });
        });
        return compilesDialogs;
    }

    render() {
        const dialogs = this.dialogListCompile(this.props.dialogs);
        return this.compile({ ...this.props, dialogs });
    }
}
