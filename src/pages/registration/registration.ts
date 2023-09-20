import {IProps,Block} from "../../utils/Block.ts";

export interface IPageRegistrationProps extends IProps {
    onLogin:(event:Event)=>void,
}
export class PageRegistration extends Block {
    constructor() {
        const props:IPageRegistrationProps={
            events:{},
            onLogin:  (event: Event) => {
                event.preventDefault();
                const login = this.refs.form.getRefs()?.login.value();
                const email = this.refs.form.getRefs()?.email.value();
                const phone = this.refs.form.getRefs()?.phone.value();
                const first_name = this.refs.form.getRefs()?.first_name.value();
                const second_name = this.refs.form.getRefs()?.second_name.value();
                const password = this.refs.form.getRefs()?.password.value();
                const password2 = this.refs.form.getRefs()?.password2.value();

                console.log({
                    login,
                    password,
                    password2,
                    second_name,
                    first_name,
                    phone,
                    email
                })
            }
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputShort label='Email' type='email' name='email' validate=validate.email ref='email' }}}
            {{{ InputShort label='Login' type='text' name='login' validate=validate.login ref='login' }}}
            {{{ InputShort label='First Name' type='first_name' name='first_name' validate=validate.name ref='first_name' }}}
            {{{ InputShort label='Second Name' name='second_name' validate=validate.name ref='second_name' }}}
            {{{ InputShort label='Phone'  name='phone' validate=validate.phone ref='phone' }}}
            {{{ InputShort label='Password' type='password' name='password' validate=validate.password ref='password' }}}
            {{{ InputShort label='Password (2nd time)' type='password' name='password2' validate=validate.password ref='password2' }}}`
        )
    }

    protected render(): string {

        return (`
            <form class="container container-center">
                {{{ FormAuth caption="Registration" captionOk="sign up" captionCancel="Cancel" pageOk="allPages" pageCancel="loginPage" onClickOkButton=onLogin children="${this.getChildren()}" ref="form" }}}
            </form>`)
    }
}
