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
    avatar: string,
    dialog: Array<TMessage>,
    id: string,
    lastMsg: TMessage,
    newMsg: number,
    nick: string
}


export default class ChatPage extends Block {
    activeDialog: TDialog | undefined;

    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    static changeActiveDialog(self: ChatPage, e: Event): void {
        const target = e?.target as HTMLElement;
        const item = target.closest('.dialogs__item') as HTMLElement;
        if (!item) return;
        const active = item.dataset.dialogId ?? undefined;
        const dialog = self.searchActiveDialog(active);

        if (!active || !dialog) return;
        self.children.listDialog.setProps({
            active,
        });
        self.children.activeDialog.setProps({
            ...dialog,
            messages: '',
            avatar: dialog.avatar ? dialog.avatar : avatarDefault,
        });
    }

    static sortedDialogs(dialogs: Array<TDialog> = []): Array<TDialog> | [] {
        const sortedDialogs = [...dialogs] ?? [];
        if (!sortedDialogs) return [];
        sortedDialogs.forEach((item) => {
            item.dialog.sort((msg1, msg2) => (formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1));
            item.newMsg = 0;
            item.dialog.forEach((msg) => (msg.new ? item.newMsg++ : ''));
            item.lastMsg = item.dialog[item.dialog.length - 1];
        });
        sortedDialogs.sort((dialog1, dialog2) => (formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1));
        return sortedDialogs;
    }


    // eslint-disable-next-line class-methods-use-this
    searchActiveDialog(active: string | undefined): TDialog | undefined {
        for (let i = 0; i < exampleChatData.length; i++) {
            const item = exampleChatData[i];
            if (item.id === active) {
                return item;
            }
        }
        return undefined;
    }

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


const searchDialog = new Input({
    attr: {
        class: 'search form__input',
    },
    placeholder: 'Поиск',
    label: '<i class="fa fa-search"></i>',
    type: 'search',
});

const profileLink = new Link({
    attr: {
        href: '/profile.html',
        class: 'link',
    },
    text: 'Профиль >',
});

const dialogsList = new DialogsList({
    attr: {
        class: 'dialogs',
    },
    dialogs: ChatPage.sortedDialogs(exampleChatData),
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


const chatPage = new ChatPage({
    attr: {
        class: 'app__chat-page',
    },
    activeDialog: activeDialogTest,
    listDialog: dialogsList,
    profileLink,
    searchDialog,
    events: {
        click: ChatPage.changeActiveDialog,
    },
}, templateChat);

const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(chatPage.getContent());
}
