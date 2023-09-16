import Block from "../../utils/Block";

export class LoginPage extends Block {
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
    }

    protected render(): string {
        return(`
            <form class="container container-center">
           
<!--                    {{{ InputField label="Login" ref="login" validate=validate.login }}}
                    {{{ InputField label="Password" ref="password" }}}
                    {{{ Button label="Sign in" type="primary" page="list" onClick=onLogin }}}-->
                           {{{ Button caption='ok-text' page='ok-page' }}}

            </form>
        `)
    }
}
