import { Block, FormValidator } from "../../core";

import { ProfileDataList } from ".";

class ProfileEditData extends Block {
    static componentName = "ProfileEditData";

    constructor() {
        super();

        this.setProps({
            data: ProfileDataList,
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
                            {{#each this.data }}
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

export default ProfileEditData;
