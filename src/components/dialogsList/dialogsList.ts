import templateListDialogs from './dialogList.hbs';
import Block, { TProps } from '../../classes/Block';
import { TDialog } from '../../pages/chat/chat';
import { getDateLastMessage } from '../../utils/date';
import { sliceLastMessage } from '../../utils/text';
import avatarDefault from '../../assets/icon/avatar_default.png';
import './dialogList.scss';
import Store from '../../classes/Store';

type TDialogItem = {
    avatar: string | null,
    id: number,
    title: string,
    last_message?: Record<string, string | number> | null,
    last_message_text?: string,
    last_message_time?: string,
    unread_count: number,
    itemClass: string,
}
export default class DialogsList extends Block {
    dialogs: Array<TDialogItem> | [] = [];


    constructor(props: TProps) {
        super('div', props, templateListDialogs);
    }


    dialogListCompile(dialogs: Array<TDialogItem> = []): Array<TDialogItem> | [] {
        const compilesDialogs: Array<TDialogItem> | undefined = [];
        const activeDialog = Store.getState()?.currentChat?.chat?.id;
        dialogs.forEach((item) => {
            const out = item?.last_message?.user.login === Store.getState()?.user?.login;
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarDefault,
                id: item.id,
                title: item.title,
                last_message_text: sliceLastMessage(item?.last_message?.content, out) ?? '',
                last_message_time: getDateLastMessage(item?.last_message?.time) ?? '',
                unread_count: item.unread_count ?? 2,
                itemClass: item.id == this.props.activeDialog ? 'active' : '',
            });
        });
        return compilesDialogs;
    }
    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        console.log(_newProps.dialogs[0]?.last_message?.content);
        return true;
    }
    render() {
        
        const dialogs = this.dialogListCompile(this.props.dialogs);
        
        return this.compile({ ...this.props, dialogs });
    }
}
