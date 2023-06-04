import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";
import Validator from "../core/Validator";
import Services from "../core/Services";

import CreateChatBtn from "../components/CreateChatBtn";
import TooltipBtn from "../components/TooltipBtn";
import TooltipItem from "../components/TooltipItem";
import AddChatImage from "../components/AddChatImage";
import DeleteChat from "../components/DeleteChat";
import AddUser from "../components/AddUser";
import DeleteUser from "../components/DeleteUser";
import Messages from "../components/Messages";
import AddMessageBtn from "../components/AddMessageBtn";

import authControllers from "../controllers/authControllers";
import chatsControllers from "../controllers/chatsControllers";

import setWindowToggle from "../utils/setWindowToggle";
import setTooltipToggle from "../utils/setTooltipToggle";
import findChatById from "../utils/findChatById";

class Chat extends Block {
    constructor() {

        chatsControllers.getAllChats();
        authControllers.getUser();

        const createChatBtn = new CreateChatBtn({
            events: {
                click: (e) => {
                    e.preventDefault();

                    const chatCreateName = document.querySelector(".chat__create-name") as HTMLInputElement;

                    const data = Validator.getDataFromForm("chat__create");
                    chatsControllers.createNewChat(data);

                    chatCreateName.value = "";
                },
            },
        });

        const tooltipBtn = new TooltipBtn();

        const tooltipItems = [
            new TooltipItem({
                text: "Добавить аватар",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__addChatImage");
                        setTooltipToggle();
                    },
                },
            }),
            new TooltipItem({
                text: "Удалить чат",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__deleteChat");
                        setTooltipToggle();
                    },
                },
            }),
            new TooltipItem({
                text: "Добавить пользователя",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__addUser");
                        setTooltipToggle();
                    },
                },
            }),
            new TooltipItem({
                text: "Удалить пользователя",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__deleteUser");
                        setTooltipToggle();
                    },
                },
            }),
        ];

        const addMessageBtn = new AddMessageBtn({
            events: {
                click: (e) => {
                    e.preventDefault();

                    const data = Validator.validateForm("chat__message");

                    if (data) {
                        const chatId = Store.getState().currentChat.id;
                        const socket = findChatById(chatId);
                        const textarea = document.querySelector(".chat__message-textarea") as HTMLInputElement;

                        textarea.value = "";

                        if (socket) {
                            socket.send({
                                type: "message",
                                content: data.message,
                            });
                        }
                    }
                },
            },
        });

        const messages = new Messages();

        const addChatImage = new AddChatImage();
        const deleteChat = new DeleteChat();
        const addUser = new AddUser();
        const deleteUser = new DeleteUser();

        super({
            createChatBtn,
            tooltipItems,
            tooltipBtn,
            addChatImage,
            deleteChat,
            addUser,
            deleteUser,
            messages,
            addMessageBtn,
            events: {
                click: (e: Event) => {
                    Services.onClick(e);
                },
            },
        });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <main class="chat">
                <div class="chat__container">
                    <div class="chat__sidebar">
                        <div class="chat__sidebar-head">
                            <div class="chat__profile-box">
                                <a class="chat__profile-link" href="profile">
                                    Профиль
                                </a>
                            </div>
                            <form class="chat__create">
                                <input class="chat__create-name" type="text" name="title" placeholder="Имя чата">
                                {{{createChatBtn}}}
                            </form>
                        </div>
                        <ul class="chat__list">
                            {{#each chats}}
                                <li class="chat__item" data-id="{{id}}" data-title="{{title}}" data-avatar="{{avatar}}" data-value="chat-item">
                                    <div class="chat__item-logo">
                                        {{#if avatar}}
                                            <img class="chat__item-img" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}">  
                                        {{/if}}
                                    </div>
                                    <div class="chat__item-data">
                                        <span class="chat__item-title">
                                            {{title}}
                                        </span>
                                    </div>
                                </li>
                            {{/each}}
                        </ul>
                    </div>
                    <div class="chat__main">
                        {{#if currentChat}}
                            <div class="chat__settings">
                                <div class="chat__item-plus">
                                    <div class="chat__item-logo">
                                        {{#if currentChat.avatar}}
                                            <img class="chat__item-img" src="https://ya-praktikum.tech/api/v2/resources{{currentChat.avatar}}">  
                                        {{/if}}
                                    </div>
                                    <span class="chat__item-title">
                                        {{currentChat.title}}
                                    </span>
                                </div>
                                <div class="chat__tools">
                                    {{{tooltipBtn}}}
                                    <div class="chat__tooltip-box close">
                                        {{#each tooltipItems}}
                                            {{{this}}}
                                        {{/each}}
                                    </div>
                                </div>
                            </div>
                            {{{messages}}}
                            <form class="chat__message">
                                <textarea class="chat__message-textarea" name="message" placeholder="Написать сообщение"></textarea>
                                {{{addMessageBtn}}}
                            </form>
                            {{else}}
                                <div class="chat__main-cover">
                                    Выберите чат из списка или создайте новый
                                </div>
                        {{/if}}
                    </div>
                </div>
                {{#if currentChat}}
                    {{{addChatImage}}}
                    {{{deleteChat}}}
                    {{{addUser}}}
                    {{{deleteUser}}}
                {{/if}} 
                {{#if server-error}}
                    <div class="server-error">
                        {{{server-error}}}
                    </div>
                {{/if}}
            </main>
        `, { ...this.props });
    };
};

export default Chat;
