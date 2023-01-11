import { Block, FormValidator } from "../../core";

export interface RegisterProps {
    title: string;
    name: string;
    type: string;
}

class Register extends Block {
    static componentName = "Register";

    private readonly RegisterData: RegisterProps[] = [
        {
            title: "Почта",
            name: "email",
            type: "email",
        },
        {
            title: "Логин",
            name: "login",
            type: "text",
        },
        {
            title: "Имя",
            name: "first_name",
            type: "text",
        },
        {
            title: "Фамилия",
            name: "second_name",
            type: "text",
        },
        {
            title: "Телефон",
            name: "phone",
            type: "text",
        },
        {
            title: "Пароль",
            name: "password",
            type: "password",
        },
        {
            title: "Пароль (ещё раз)",
            name: "password",
            type: "password",
        },
    ];

    constructor() {
        super();

        this.setProps({
            data: this.RegisterData,
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
                    {{{ EntryTitle title="Регистрация" }}}
                    <form class="entry__container">
                        <ul class="entry__list">
                            {{#each this.data }}
                                {{{ EntryItem title=this.title name=this.name type=this.type }}}
                            {{/each }}
                        </ul>
                        <div class="entry__choice">
                            {{{ Button value="Зарегистрироваться" mod="entry__choice-btn" type="submit" onClick=onSubmit }}}
                            <a class="entry__choice-link" href="register">
                                Войти
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}

export default Register;
