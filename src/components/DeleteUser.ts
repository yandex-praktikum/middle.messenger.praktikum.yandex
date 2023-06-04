import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

import FindUserBtn from "./FindUserBtn";
import UserBtn from "./UserBtn";
import FormButton from "./FormButton";

import chatsControllers from "../controllers/chatsControllers";

import setWindowToggle from "../utils/setWindowToggle";

class DeleteUser extends Block {
    constructor() {

        const findUserBtn = new FindUserBtn({
            text: "Найти",
            events: {
                click: (e) => {
                    e.preventDefault();

                    const chatId = Store.getState().currentChat.id;
                    chatsControllers.getChatUsers(chatId);
                },
            },
        });

        const userBtns = [
            new UserBtn({
                text: "Да",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        const userToDelete = Store.getState().userToDelete;
                        const chatId = Store.getState().currentChat.id;

                        const data = {
                            users: [userToDelete.id],
                            chatId,
                        };

                        chatsControllers.deleteUsers(data);
                    },
                },
            }),
            new UserBtn({
                text: "Нет",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        Store.setState("userToDelete", null);
                    },
                },
            }),
        ];

        const formButton = new FormButton({
            text: "Отменить",
            events: {
                click: (e) => {
                    e.preventDefault();

                    setWindowToggle("chat__deleteUser");
                },
            },
        });

        super({ findUserBtn, userBtns, formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="chat__window chat__deleteUser close">
                <form class="chat__window-form chat__deleteUser-form">
                    <div class="chat__deleteUser-formBox">
                        {{{findUserBtn}}}
                    </div>
                    {{#if userToDelete}}
                        <div class="chat__deleteUser-options">
                            <span class="chat__deleteUser-options-text">
                                Удалить <span>{{{userToDelete.login}}}?</span>
                            </span>
                            {{#each userBtns}}
                                {{{this}}}
                            {{/each}}
                        </div>
                    {{/if}}
                    <ul class="chat__deleteUser-list">
                        {{#each currentChatUsers}}
                            <li class="chat__deleteUser-item">
                                <span data-id="{{id}}" data-login="{{login}}" data-value="chat-user">
                                    {{{login}}}
                                </span>
                            </li>
                        {{/each}}
                    </ul>
                    {{{formButton}}}
                <form>
            </div>
        `, { ...this.props });
    };
};

export default DeleteUser;
