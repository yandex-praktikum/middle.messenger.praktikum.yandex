import { Block, FormValidator } from "../../core";

export interface LoginProps {
    title: string;
    name: string;
    type: string;
}

class Login extends Block {
    static componentName = "Login";

    private readonly LoginData: LoginProps[] = [
        {
            title: "Логин",
            name: "login",
            type: "text",
        },
        {
            title: "Пароль",
            name: "password",
            type: "password",
        },
    ];

    constructor() {
        super();

        this.setProps({
            data: this.LoginData,
            onSubmit: (event: Event) => this.onSubmit(event),
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();

        new FormValidator(this.element as HTMLElement).init();
    }

    protected render() {
        return `
            <div class="cover">
                <div class="entry">
                    {{{ EntryTitle title="Вход" }}}
                    <form class="entry__container">
                        <ul class="entry__list">
                            {{#each this.data }}
                                {{{ EntryItem title=this.title name=this.name type=this.type }}}
                            {{/each }}
                        </ul>
                        <div class="entry__choice">
                            {{{ Button value="Авторизоваться" mod="entry__choice-btn" type="submit" onClick=onSubmit }}}
                            <a class="entry__choice-link" href="register">
                                Нет аккаунта
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}

export default Login;
