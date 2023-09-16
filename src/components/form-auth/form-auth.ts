import Block from "../../utils/Block";

export class FormAuth extends Block {
    private caption: string;
    constructor() {
        super({
            validate: {
                login: (value: string) => value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
            }/*,
            onLogin: (event:Event) => {
                event.preventDefault();
                const login =  this.refs.login.value();
                const password =  this.refs.password.value();

                console.log({
                    login,
                    password
                })
            }*/
        });
        this.caption='Login'
    }

    protected render(): string {
        return(`
            <div class="container-form container-shadow">
    <h2 class="container-form__header">
        ${this.caption}
    </h2>
    <div>
        {{> @partial-block }}
    </div>
    <div class="container-form__buttons">
         {{{ Button caption='ok-text' page='ok-page' }}}
        {{>Link caption=cancel-text page=cancel-page }}}
    </div>
</div>
        `)
    }
}
