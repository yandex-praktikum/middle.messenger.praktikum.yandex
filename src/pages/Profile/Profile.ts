import { Block } from "../../core";

import { ProfileDataList } from ".";

class Profile extends Block {
    static componentName = "Profile";

    constructor() {
        super();

        this.setProps({
            data: ProfileDataList,
        });
    }

    protected render() {
        return `
            <div class="profile">
                {{{ ProfileSidebar }}}
                <div class="profile__container">
                    {{{ ProfileUser }}}
                    <ul class="profile__list">
                        {{#each this.data }}
                            {{{ ProfileItem key=this.key value=this.value }}}
                        {{/each }}
                    </ul>
                    <ul class="profile__list">
                        <li class="profile__item">
                            <span class="profile__edit">
                                <a href="profileEditData">
                                    Изменить данные
                                </a>
                            </span>
                        </li>
                        <li class="profile__item">
                            <span class="profile__edit">
                                <a href="profileEditPassword">
                                    Изменить пароль
                                </a>
                            </span>
                        </li>
                        <li class="profile__item">
                            <span class="profile__exit">
                                <a href="/">
                                    Выйти
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}

export default Profile;
