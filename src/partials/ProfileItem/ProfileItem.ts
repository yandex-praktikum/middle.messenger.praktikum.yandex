import { Block } from "../../core";

import { ProfileProps } from "pages/Profile";

class ProfileItem extends Block {
    static componentName = "ProfileItem";

    constructor(props: ProfileProps) {
        super(props);
    }

    protected render() {
        return `
            <li class="profile__item">
                <span class="profile__key">{{ key }}</span>
                <span class="profile__value">{{ value }}</span>
            </li>
        `;
    }
}

export default ProfileItem;
