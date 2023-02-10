import Block from "../core/Block";
import Validator from "../core/Validator";
import Store, { StoreEvents } from "../core/Store";

import FormButton from "../components/FormButton";
import ProfileItem from "../components/ProfileItem";

import userControllers from "../controllers/userControllers";

class ProfileEditData extends Block {
    constructor() {
        const userFormStorage = localStorage.getItem("user");
        let user;
        if (userFormStorage) {
            user = JSON.parse(userFormStorage);
        }

        const formButton = new FormButton({
            text: "Сохранить",
            events: {
                click: (e: Event) => {
                    e.preventDefault();

                    const data = Validator.validateForm("profile__form");

                    if (data) {
                        userControllers.changeUserProfile(data);
                    }
                },
            },
        });

        const itemList = [
            new ProfileItem({
                type: "email",
                name: "email",
                title: "Почта",
                value: user.email,
            }),
            new ProfileItem({
                type: "text",
                name: "login",
                title: "Логин",
                value: user.login,
            }),
            new ProfileItem({
                type: "text",
                name: "first_name",
                title: "Имя",
                value: user.first_name,
            }),
            new ProfileItem({
                type: "text",
                name: "second_name",
                title: "Фамилия",
                value: user.second_name,
            }),
            new ProfileItem({
                type: "text",
                name: "display_name",
                title: "Имя в чате",
                value: user.display_name,
            }),
            new ProfileItem({
                type: "text",
                name: "phone",
                title: "Телефон",
                value: user.phone,
            }),
        ];

        super({ itemList, formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <main class="profile">
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
            </main>
        `, { ...this.props });
    };
};

export default ProfileEditData;
