import { Block, FormValidator } from "../../core";

import { ProfileProps } from ".";

class ProfileEditPassword extends Block {
    static componentName = "ProfileEditPassword";

    private readonly ProfilePasswordList: ProfileProps[] = [
        {
            key: "Старый пароль",
            value: "Qwer123456",
            name: "password",
            type: "password",
        },
        {
            key: "Новый пароль",
            value: "Qwerty1234567",
            name: "password",
            type: "password",
        },
        {
            key: "Повторите новый пароль",
            value: "Qwerty1234567",
            name: "password",
            type: "password",
        },
    ];

    constructor() {
        super();

        this.setProps({
            passwords: this.ProfilePasswordList,
            onSubmit: (event: Event) => this.onSubmit(event),
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();

        new FormValidator(this.element as HTMLElement).init();
    }

    protected render() {
        return `
            <div class="profile">
                {{{ ProfileSidebar }}}
                <div class="profile__container">
                    {{{ ProfileUser }}}
                    <form>
                        <ul class="profile__list">
                            {{#each this.passwords }}
                                {{{ ProfileInput key=this.key value=this.value name=this.name type=this.type }}}
                            {{/each }}
                        </ul>
                    </form>
                    <a class="profile__save" href="profile">
                        {{{ Button value="Сохранить" mod="profile__save-btn" type="submit" onClick=onSubmit }}}
                    </a>
                </div>
            </div>
        `;
    }
}

export default ProfileEditPassword;
