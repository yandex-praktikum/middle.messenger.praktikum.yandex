import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

import FormButton from "../components/FormButton";

import userControllers from "../controllers/userControllers";

class ProfileEditAvatar extends Block {
    constructor() {

        const formButton = new FormButton({
            text: "Сохранить",
            events: {
                click: (e: Event) => {
                    e.preventDefault();

                    const err = document.querySelector(".profile__avatar-error") as HTMLElement;
                    err.textContent = "";

                    const permittedFileTypes = ["jpg", "jpeg", "png"];
                    const file = document.querySelector(".profile__avatar-file") as any;

                    if (!file || !file.files.length) return;

                    const fileName = file.files[0].name.toLowerCase();
                    const isFileTypeOk = permittedFileTypes.some(type => fileName.endsWith(type));

                    if (!isFileTypeOk) {
                        err.textContent = "Допустимы только файлы jpg, jpeg или png";
                        return;
                    }

                    const formData = new FormData();
                    formData.append("avatar", file.files[0]);

                    userControllers.changeUserAvatar(formData);
                },
            },
        });

        super({ formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <main class="profile">
                <form class="profile__form">
                    <div class="profile__container">
                        <div class="profile__change-box">
                            <span class="profile__change-avatar" href="profile-edit-avatar">
                                Изменить аватар
                            </span>
                        </div>
                        <input class="profile__avatar-file" type="file" name="avatar" accept="image/*">
                        <span class="profile__avatar-error">
                            
                        </span>
                        {{{formButton}}}
                    </div>
                </form>
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
            </main>
        `, { ...this.props });
    };
};

export default ProfileEditAvatar;
