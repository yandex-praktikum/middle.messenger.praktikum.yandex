import { Block } from "../../core";

import { ProfileProps } from ".";

class ProfileEditPassword extends Block {
    static componentName = "ProfileEditPassword";

    private readonly ProfilePasswordList: ProfileProps[] = [
        {
            key: "Старый пароль",
            value: "•••••••••",
        },
        {
            key: "Новый пароль",
            value: "•••••••••••",
        },
        {
            key: "Повторите новый пароль",
            value: "•••••••••••",
        },
    ];

    constructor() {
        super();

        this.setProps({
            password: this.ProfilePasswordList,
        });
    }

    protected render() {
        return `
            <div class="profile">
                {{{ ProfileSidebar }}}
                <div class="profile__container">
                    {{{ ProfileUser }}}
                    <ul class="profile__list">
                        {{#each this.password }}
                            {{{ ProfileItem key=this.key value=this.value }}}
                        {{/each }}
                    </ul>
                    <a class="profile__save" href="profile">
                        {{{ Button value="Сохранить" mod="profile__save-btn" }}}
                    </a>
                </div>
            </div>
        `;
    }
}

export default ProfileEditPassword;
