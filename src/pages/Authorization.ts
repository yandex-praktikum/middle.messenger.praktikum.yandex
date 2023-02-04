import Block from "../core/Block";
import Validator from "../core/Validator";
import Store, { StoreEvents } from "../core/Store";

import EntryItem from "../components/EntryItem";
import FormButton from "../components/FormButton";

import authControllers from "../controllers/authControllers";

class Authorization extends Block {
    constructor() {

        const itemList = [
            new EntryItem({
                type: "text",
                name: "login",
                title: "Логин",
            }),
            new EntryItem({
                type: "password",
                name: "password",
                title: "Пароль",
            }),
        ];

        const formButton = new FormButton({
            text: "Авторизоваться",
            events: {
                click: (e: Event) => {
                    e.preventDefault();

                    const data = Validator.validateForm("entry__form");

                    if (data) {
                        authControllers.authorization(data);
                    }
                },
            },
        });

        super({ itemList, formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="entry">
                <div class="entry__container">
                    <h2 class="entry__title">
                        Вход
                    </h2>
                    <form class="entry__form">
                        <ul class="entry__list">
                            {{#each itemList}}
                                {{{this}}}
                            {{/each}}
                        </ul>
                        <div class="entry__choice">
                            {{{formButton}}}
                            <a class="entry__choice-link" href="registration">
                                Нет аккаунта?
                            </a>
                        </div>
                    </form>
                </div>
                {{#if server-error}}
                    <div class="server-error">
                        {{{server-error}}}
                    </div>
                {{/if}}
            </div>
        `, { ...this.props });
    };
};

export default Authorization;
