import {IProps,Block} from "../../utils/Block.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";
import {IUser} from "../../models/IUser.ts";
import {IPageProfileProps} from "../profile/profile.ts";

export interface IPageProfileEditProps extends IProps {
    onChange:(event:Event)=>void,
    user:IUser
}
export class PageProfileEdit extends Block {
    constructor() {
        const props:IPageProfileEditProps={
            events:{},
            user:mockUser,
            onChange: (event: Event) => {
                event.preventDefault();
                const login = this.refs.form.getRefs()?.login.value();
                const email = this.refs.form.getRefs()?.email.value();
                const phone = this.refs.form.getRefs()?.phone.value();
                const first_name = this.refs.form.getRefs()?.first_name.value();
                const second_name = this.refs.form.getRefs()?.second_name.value();
                const display_name = this.refs.form.getRefs()?.display_name.value();

                console.log({
                    login,
                    second_name,
                    first_name,
                    display_name,
                    phone,
                    email
                })
            }
        }
        super(props);
    }

    getChildren() {
        const {email,login,first_name,second_name,display_name,phone}=(this._props as IPageProfileProps).user;
        return (
            `{{{ InputWide label='Email' type='email' name='email' validate=validate.email ref='email' readOnly=false value='${email}' }}}
            {{{ InputWide label='Login' type='text' name='login' validate=validate.login ref='login' readOnly=false value='${login}'  }}}
            {{{ InputWide label='First Name' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnly=false value='${first_name}'  }}}
            {{{ InputWide label='Second Name' name='second_name' validate=validate.name ref='second_name' readOnly=false value='${second_name}'  }}}
            {{{ InputWide label='Name in Chat' name='display_name' validate=validate.name ref='display_name' readOnly=false  value='${display_name}' }}}
            {{{ InputWide label='Phone'  name='phone' validate=validate.phone ref='phone' readOnly=false  value='${phone}' }}}
            
            `
        )
    }

    protected render(): string {
        return (`
            <form class="container">
                {{{ FormProfile user=user withButton=true  children="${this.getChildren()}" ref="form" buttonPage='pageProfile' onClickOkButton=onChange buttonText='Save User Profile' }}}
            </form>`)
    }
}
