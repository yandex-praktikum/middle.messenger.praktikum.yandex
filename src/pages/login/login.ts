import {IProps,Block} from "../../utils/Block";

export interface ILoginPageProps extends IProps {
    onLogin:(event:Event)=>void
}
export class LoginPage extends Block {
    constructor() {
        const props:ILoginPageProps={
            events:{},
            onLogin: (event:Event) => {
                event.preventDefault();
                const login =  this.refs.formLogin.getRefs()?.login.value();
                const password =  this.refs.formLogin.getRefs()?.password.value();

                console.log({
                    login,
                    password
                })
            }
        }

        super(props);
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
