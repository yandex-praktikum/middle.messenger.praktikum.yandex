import { Block, } from "../../core";

import { ProfileProps } from "pages/Profile";

class ProfileInput extends Block {
    static componentName = "ProfileInput";

    constructor(props: ProfileProps) {
        super(props);
    }

    protected render() {
        return `
            <li class="profile__item profile__item_mod">
                <input class="profile__input" name={{ name }} type={{ type }} value={{ value }} autocomplete="off" />
                <label class="profile__label">
                    {{ key }}
                </label>
                <span class="profile__error">
                </span>
            </li>
        `;
    }
}

export default ProfileInput;
