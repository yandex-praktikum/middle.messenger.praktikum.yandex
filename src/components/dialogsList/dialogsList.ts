import templateListDialogs from './dialogList.hbs';
import Block, { TProps } from '../../classes/Block';
import { getDateLastMessage } from '../../utils/date';
import { sliceLastMessage } from '../../utils/text';
import avatarDefault from '../../assets/icon/avatar_default.png';
import './dialogList.scss';
import Store, { Chat, State } from '../../classes/Store';
import { connect } from '../../utils/store';

type TDialogItem = {
    avatar: string | null,
    id: number,
    title: string,
    last_message?: Record<string, string | number | unknown | any> | null,
    last_message_text?: string,
    last_message_time?: string,
    unread_count: number,
    itemClass: string,
}
class DialogsList extends Block {
    dialogs: Array<Chat> | [] = [];


    constructor() {
        super('div', {
            attr: {
                class: 'dialogs',
            },

        }, templateListDialogs);
    }

    static getStateToProps(state: State): TProps {
        let props = {
        };
        if (state?.chats) {
            props = {
                dialogs: state.chats,
                activeDialog: state?.currentChat?.chat?.id,
            };
        }
        return props;
    }

    dialogListCompile(dialogs: Array<TDialogItem> = []): Array<TDialogItem> | [] {
        const compilesDialogs: Array<TDialogItem> | undefined = [];
        dialogs.forEach((item) => {
            const out = item?.last_message?.user?.login === Store.getState()?.user?.login;
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarDefault,
                id: item.id,
                title: item.title,
                last_message_text: sliceLastMessage(item?.last_message?.content, out) ?? '',
                last_message_time: getDateLastMessage(item?.last_message?.time) ?? '',
                unread_count: item.unread_count ?? 2,
                itemClass: item.id === this.props.activeDialog ? 'active' : '',
            });
        });
        return compilesDialogs;
    }

    render() {
        const dialogs = this.dialogListCompile(this.props.dialogs);
        return this.compile({ ...this.props, dialogs });
    }
}

export default connect(DialogsList);
