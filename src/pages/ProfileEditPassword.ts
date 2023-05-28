import Block from "../core/Block";
import Validator from "../core/Validator";
import Store, { StoreEvents } from "../core/Store";

import FormButton from "../components/FormButton";
import ProfileItem from "../components/ProfileItem";

import userControllers from "../controllers/userControllers";

class ProfileEditPassword extends Block {
    constructor() {

        const formButton = new FormButton({
            text: "Сохранить",
            events: {
                click: (e: Event) => {
                    e.preventDefault();

                    const data = Validator.validateForm("profile__form");

                    if (data) {
                        userControllers.changeUserPassword(data);
                    }
                },
            },
        });

        const itemList = [
            new ProfileItem({
                type: "password",
                name: "oldPassword",
                title: "Старый пароль",
            }),
            new ProfileItem({
                type: "password",
                name: "newPassword",
                title: "Новый пароль",
            }),
        ];

        super({ itemList, formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="profile">
                <div class="profile__container">
                    <form class="profile__form">
                        <ul class="profile__list">
                            {{#each itemList}}
                                {{{this}}}
                            {{/each}}
                        </ul>
                        {{{formButton}}}
                    </form>
                </div>
                <div class="profile__sidebar">
                    <a class="profile__back-chat" href="profile">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#000000" />
                        </svg>
                    </a>
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

export default ProfileEditPassword;
