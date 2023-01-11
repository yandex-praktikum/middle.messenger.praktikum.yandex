import { Block } from "../../core";

import { ProfileDataList } from ".";

class ProfileEditData extends Block {
    static componentName = "ProfileEditData";

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
                    <a class="profile__save" href="profile">
                        {{{ Button value="Сохранить" mod="profile__save-btn" }}}
                    </a>
                </div>
            </div>
        `;
    }
}

export default ProfileEditData;
