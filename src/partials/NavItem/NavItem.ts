import { Block } from "../../core";

import { NavProps } from "pages/Nav/Nav";

class NavItem extends Block {
    static componentName = "NavItem";

    constructor(props: NavProps) {
        super(props);
    }

    protected render() {
        return `
            <li class="nav__item">
                <a class="nav__link" href="{{ href }}">
                    {{ title }}
                </a>
            </li>
        `;
    }
}

export default NavItem;
