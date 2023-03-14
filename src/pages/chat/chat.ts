/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import Form from '../../components/form/form';
import Button from '../../components/button/button';
import DialogsList from '../../components/dialogsList/dialogsList';
import DialogActive from '../../components/dialog/dialogActive';
import templateChat from './chat.hbs';
import '../../assets/style/app.scss';
import './chat.scss';
import SearchUsers from '../../components/searchUsers/searchUsers';
import UsersController from '../../controlles/UsersController';
import ChatsController from '../../controlles/ChatsController';
import MessageController from '../../controlles/MessageController';
import { onSubmit } from '../../utils/validation';

const { addNewChatUser, createChat } = ChatsController;
const { searchUsers } = UsersController;
const { sendMessage, getMessage } = MessageController;

export type TMessage = Record<string, string | number | null>;


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

    constructor() {
        const props = {
            attr: {
                class: 'app__chat-page',
            },
            activeDialog,
            listDialog: new DialogsList(),
            profileLink,
            newChatBtn,
            searchDialog,
            events: {
                click: (_self: Block, e: Event) => {
                    const target = e?.target as HTMLElement;
                    const item = target.closest('.dialogs__item') as HTMLElement;
                    if (!item) return;
                    const active = item.dataset.dialogId ?? undefined;
                    MessageController.changeCurrentChat(active);
                },
            },
        };
        super('main', props, templateChat);
        ChatsController.getChats();
        setInterval(ChatsController.getChats.bind(ChatsController), 20000);
    }


    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        if (_newProps.activeDialog !== _oldProps.activeDialog) {
            this.children.listDialog.setProps({
                activeDialog: _newProps.activeDialog,
            });
        }
        return true;
    }

    render() {
        return this.compile(this.props);
    }
}


const searchDialog = new SearchUsers({
    attr: {
        class: 'search-block',
    },
    items: null,
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
            createChat.bind(ChatsController)(prompt('Введите название чата'));
        },
    },
});

export const activeDialog = new DialogActive({
    attr: {
        class: 'current-dialog',
    },
    newMsgForm: new Form({
        attr: {
            class: 'new-msg-send-form form',
        },
        controller: sendMessage.bind(MessageController),
        items: [

            new Input({
                attr: {
                    class: 'control-input',
                },
                validation: {
                    required: true,
                    minlength: 1,
                    maxlength: 9999,
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
            submit: (self: Form, e: Event) => {
                e.preventDefault();
                onSubmit(self, e);
                self.resetForm();
                self.getContent().focus();
            },
        },
    }),
    btn: new Button({
        attr: {
            class: 'btn delete',
        },
        events: {
            click: () => {
                if (!confirm('Вы точно хотите удалить текущий чат?')) return;
                ChatsController.deleteChats.bind(ChatsController)();
            },
        },
    }),
    messages: [],
    events: {
        scroll: (_self: Block, e: Event) => {
            const elem = e?.target as HTMLElement;
            if (elem.scrollTop) return;
            getMessage.bind(MessageController)();
        },
    },
});

export default ChatPage;
