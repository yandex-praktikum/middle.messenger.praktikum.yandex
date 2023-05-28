import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";
import Validator from "../core/Validator";

import FindUserBtn from "./FindUserBtn";
import UserBtn from "./UserBtn";
import FormButton from "./FormButton";

import chatsControllers from "../controllers/chatsControllers";
import userControllers from "../controllers/userControllers";

import setWindowToggle from "../utils/setWindowToggle";

class AddUser extends Block {
    constructor() {

        const findUserBtn = new FindUserBtn({
            text: "Найти",
            events: {
                click: (e) => {
                    e.preventDefault();

                    const data = Validator.getDataFromForm("chat__addUser-form");
                    userControllers.findUserByLogin(data);
                },
            },
        });

        const userBtns = [
            new UserBtn({
                text: "Да",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        const userToAdd = Store.getState().userToAdd;
                        const chatId = Store.getState().currentChat.id;

                        const data = {
                            users: [userToAdd.id],
                            chatId,
                        };

                        chatsControllers.addUsers(data);
                    },
                },
            }),
            new UserBtn({
                text: "Нет",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        Store.setState("userToAdd", null);

                        setWindowToggle("chat__addUser")
                    },
                },
            }),
        ];

        const formButton = new FormButton({
            text: "Отменить",
            events: {
                click: (e) => {
                    e.preventDefault();

                    setWindowToggle("chat__addUser");
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
            <div class="chat__window chat__addUser close">
                <form class="chat__window-form chat__addUser-form">
                    <div class="chat__addUser-formBox">
                        <input class="chat__addUser-input" type="text" name="login" placeholder="Логин">
                        {{{findUserBtn}}}
                    </div>
                    {{#if userToAdd}}
                        <div class="chat__addUser-options">
                            <span class="chat__addUser-options-text">
                                Добавить <span>{{{userToAdd.login}}}?</span>
                            </span>
                            {{#each userBtns}}
                                {{{this}}}
                            {{/each}}
                        </div>
                    {{/if}}
                    <ul class="chat__addUser-list">
                        {{#each usersFound}}
                            <li class="chat__addUser-item">
                                <span data-id="{{id}}" data-login="{{login}}" data-value="found-user">
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

export default AddUser;
