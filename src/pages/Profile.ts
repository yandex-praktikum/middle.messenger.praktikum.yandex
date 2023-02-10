import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

import AvatarBlock from "../components/AvatarBlock";
import ProfileData from "../components/ProfileData";
import ProfileItem from "../components/ProfileItem";
import LogoutButton from "../components/LogoutButton";

import authControllers from "../controllers/authControllers";

class Profile extends Block {
    constructor() {
        authControllers.getUser();

        const avatarBlock = new AvatarBlock();
        const profileData = new ProfileData();

        const logoutButton = new LogoutButton({
            text: "Выйти",
            events: {
                click: (e) => {
                    e.preventDefault();

                    authControllers.logout();
                },
            },
        });

        const itemList = [
            new ProfileItem({
                type: "email",
                name: "email",
                title: "Почта",
                disabled: "disabled",
            }),
            new ProfileItem({
                type: "text",
                name: "login",
                title: "Логин",
                disabled: "disabled",
            }),
            new ProfileItem({
                type: "text",
                name: "first_name",
                title: "Имя",
                disabled: "disabled",
            }),
            new ProfileItem({
                type: "text",
                name: "second_name",
                title: "Фамилия",
                disabled: "disabled",
            }),
            new ProfileItem({
                type: "text",
                name: "display_name",
                title: "Имя в чате",
                disabled: "disabled",
            }),
            new ProfileItem({
                type: "text",
                name: "phone",
                title: "Телефон",
                disabled: "disabled",
            }),
        ];

        super({ itemList, avatarBlock, profileData, logoutButton });

        Store.on(StoreEvents.Updated, () => {
            const user = Store.getState().currentUser;

            this.setProps(user);
        });
    };

    render() {
        return this.compile(`
            <main class="profile">
                <div class="profile__container">
                    <div class="profile__avatar">
                        {{{avatarBlock}}}
                        <div class="profile__change-box">
                            <a class="profile__change-link" href="profile-edit-avatar">
                                Изменить аватар
                            </a>
                        </div>
                    </div>
                    {{{profileData}}}
                    <div class="profile__cross">
                        <div class="profile__cross-box">
                            <a class="profile__cross-link" href="profile-edit-data">
                                Изменить данные
                            </a>
                        </div>
                        <div class="profile__cross-box">
                            <a class="profile__cross-link" href="profile-edit-password">
                                Изменить пароль
                            </a>
                        </div>
                        <div class="profile__cross-box">
                            {{{logoutButton}}}
                        </div>
                    </div>
                </div>
                <div class="profile__sidebar">
                    <a class="profile__back-chat" href="chat">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#000000" />
                        </svg>
                    </a>
                </div>
            </main>
        `, { ...this.props });
    };
};

export default Profile;
