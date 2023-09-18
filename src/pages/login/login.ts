import Block from "../../utils/Block";

export class LoginPage extends Block {
    constructor() {
        super({

            onLogin: (event:Event) => {
                event.preventDefault();
                // @ts-ignore
                const login =  this.refs.formLogin.refs?.login.value();
                // @ts-ignore
                const password =  this.refs.formLogin.refs?.password.value();

                console.log({
                    login,
                    password
                })
            }
        });
    }

    protected render(): string {
        const children:string=`
        {{{ InputShort label='Login' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Password' type='password' name='password' validate=validate.password ref='password' }}}`
        return(`
            <form class="container container-center">
                {{{ FormAuth caption="Login" captionOk="Login" captionCancel="Cancel" pageOk="allPages" pageCancel="loginPage" onClickOkButton=onLogin children="${children}" ref="formLogin" }}}
            </form>`)
    }
}
