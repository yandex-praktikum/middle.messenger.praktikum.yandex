import { Block } from "../../core";

export interface NavProps {
    title: string;
    href: string;
}

class Nav extends Block {
    static componentName = "Nav";

    private readonly NavData: NavProps[] = [
        {
            title: "Авторизация",
            href: "login",
        },
        {
            title: "Регистрация",
            href: "register",
        },
        {
            title: "Список чатов",
            href: "chatList",
        },
        {
            title: "Чат",
            href: "chat",
        },
        {
            title: "Профиль",
            href: "profile",
        },
        {
            title: "Профиль изм. данные",
            href: "profileEditData",
        },
        {
            title: "Профиль изм. пароль",
            href: "profileEditPassword",
        },
        {
            title: "404",
            href: "404",
        },
        {
            title: "500",
            href: "500",
        },
    ];

    constructor() {
        super();

        this.setProps({
            data: this.NavData,
        });
    }

    protected render() {
        return `
            <nav class="nav">
                <h1 class="nav__title">
                    Навигация
                </h1>
                <ul class="nav__list">
                    {{#each this.data }}
                        {{{ NavItem title=this.title href=this.href }}}
                    {{/each }}
                </ul>
            </nav>
        `;
    }
}

export default Nav;
