/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import Form from '../../components/form/form';
import Button from '../../components/button/button';
import { formattedDate } from '../../utils/date';
import DialogsList from '../../components/dialogsList/dialogsList';
import DialogActive from '../../components/dialog/dialogActive';
import { exampleChatData } from '../../../static/exampleData.json';
import avatarDefault from '../../assets/icon/avatar_default.png';
import templateChat from './chat.hbs';
import '../../assets/style/app.scss';
import './chat.scss';
import { onSubmit } from '../../utils/validation';

import { connect } from '../../utils/store';
import Store from '../../classes/Store';
import SearchUsers from '../../components/searchUsers/searchUsers';
import UsersController from '../../controlles/UsersController';
import ChatsController from '../../controlles/ChatsController';
import socket from '../../controlles/MessageController';

const { addNewChatUser, createChat, selectChat, getToken } = ChatsController;
const { searchUsers } = UsersController;

export type TMessage = {
    date: string,
    media: string,
    new: boolean,
    read: boolean,
    text: string,
    time: string,
    type: string,
};

export type TDialog = {
    last_message: any;
    title: any;
    unread_count: number;
    avatar: string,
    dialog: Array<TMessage>,
    id: string,
    lastMsg: TMessage,
    newMsg: number,
    nick: string
}


class ChatPage extends Block {
    activeDialog: TDialog | undefined;

    static getStateToProps(state) {
        let props = {
        };
        if (state?.chats) {
            props = {
                dialogs: state.chats,
                activeDialog: state.currentChat?.chat?.id,
            };
        }
        return props;
    }

    constructor() {
        // ChatsController.getChats();
        const props = {
            attr: {
                class: 'app__chat-page',
            },
            activeDialog: activeDialogTest,
            listDialog: dialogsList,
            newChatBtn,
            profileLink,
            searchDialog,
            // events: {
            //     click: (self, e) => {
            //         this.changeActiveDialog(e);
            //     },
            // },
        };
        super('main', props, templateChat);
    }

    changeActiveDialog(e: Event): void {
        const target = e?.target as HTMLElement;
        const item = target.closest('.dialogs__item') as HTMLElement;
        if (!item) return;
        const active = item.dataset.dialogId ?? undefined;
        const dialog = this.searchActiveDialog(active);

        if (!active || !dialog) return;
        this.children.listDialog.setProps({
            dialogs: [],
            active,
        });
        this.children.activeDialog.setProps({
            ...dialog,
            messages: '',
            avatar: dialog.avatar ? dialog.avatar : avatarDefault,
        });
    }

    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        if (_newProps.dialogs !== _oldProps.dialogs) {
            this.children.listDialog.setProps({
                dialogs: _newProps.dialogs,
            });
        } if (_newProps.activeDialog !== _oldProps.activeDialog) {
            this.children.listDialog.setProps({
                activeDialog: _newProps.activeDialog,
            });

        }
        return true;
    }

    // static sortedDialogs(dialogs: Array<TDialog> = []): Array<TDialog> | [] {
    //     const sortedDialogs = [...dialogs] ?? [];
    //     if (!sortedDialogs) return [];
    //     sortedDialogs.forEach((item) => {
    //         item.dialog.sort((msg1, msg2) => (formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1));
    //         item.newMsg = 0;
    //         item.dialog.forEach((msg) => (msg.new ? item.newMsg++ : 0));
    //         item.lastMsg = item.dialog[item.dialog.length - 1];
    //     });
    //     sortedDialogs.sort((dialog1, dialog2) => (formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1));
    //     return sortedDialogs;
    // }


    static createNewMsgForm(): Form {
        return new Form({
            attr: {
                class: 'new-msg-send-form form',
            },
            items: [
                new Input({
                    type: 'file',
                    name: 'inc',
                    attr: {
                        class: 'control-inc btn inc',
                    },
                    validation: {
                        required: false,
                    },
                }),
                new Input({
                    attr: {
                        class: 'control-input',
                    },
                    validation: {
                        required: true,
                        minlength: 1,
                    },
                    name: 'messagе',
                    placeholder: 'Сообщение',
                }),
            ],
            buttons: [new Button({
                attr: {
                    class: 'control-input btn arrownext',
                    type: 'control-submit',
                },
            })],
            events: {
                submit: onSubmit,
            },
        });
    }

    render() {
        return this.compile(this.props);
    }
}



const searchDialog = new SearchUsers({
    events: {
        change: searchUsers,
        click: addNewChatUser.bind(ChatsController),
    },
});

const profileLink = new Link({
    attr: {
        href: '/settings',
        class: 'link',
    },
    spa: true,
    text: 'Профиль >',
});
const newChatBtn = new Button({
    attr: {
        class: 'btn',
    },
    text: 'Создать новый чат',
    events: {
        click: () => {
            createChat(prompt('Введите название чата'));
        },
    },
});

const dialogsList = new DialogsList({
    attr: {
        class: 'dialogs',
    },
    events: {
        click: changeChat,
    },
});

const activeDialogTest = new DialogActive({
    attr: {
        class: 'current-dialog',
    },
    newMsgForm: ChatPage.createNewMsgForm(),
    btn: new Button({
        attr: {
            class: 'btn ellipsis',
        },
    }),
});

export default connect(ChatPage);


ChatsController.getToken().then(
    (value) => {
        console.log(Store.getState());
        const socket = MessageController;

        socket.connect({ userId: 371570, chatId: 5131, token: JSON.parse(value).token });
        console.log(socket);

    });
ChatsController.getChats();

async function changeChat(self, e) {
    socket.disconnect();
    const chatId = selectChat(self, e);
    const userId = Store?.getState()?.user?.id;
    const token = await getToken(chatId);
    if (!chatId || !token || !userId) return;
    socket.connect({ userId, chatId, token });
}
