import Block from "../../utils/Block";
import {
    validateEmail,
    validateLogin,
    validateName, validatePassword,
    validatePhone
} from "../../utils/validates.utils.ts";
import {IUser} from "../../models/IUser.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";

interface IFormProfileProps {
    user:IUser,
    withButton:boolean,
    children: string,
    buttonText:string,
    buttonPage:string,
    buttonCancelPage:string,
    onClickOkButton: (event:Event) => void,

/*
    onClickCancelButton: (event:any) => void,
    captionOk: string,
    captionCancel: string,
    pageOk:string,
    pageCancel:string*/
}
export class FormProfile extends Block {
    constructor(props:IFormProfileProps) {
        super({
            ...props,
            validate: {
                login: validateLogin,
                first_name:validateName,
                second_name:validateName,
                display_name:validateName,
                phone:validatePhone,
                email:validateEmail,
                password:validatePassword
            },
            onClickOk: (event:Event)=>{
                console.log('OK')
                props.onClickOkButton(event)
            },
            user:mockUser
        });
    }

    protected render(): string {
        const {user,withButton=false,children='',buttonText='',
            buttonCancelPage=''}=this.props;
        const {avatar,first_name,second_name}=user;
        return(`
      
        <div class="profile">
            <div class="profile__avatar">
                {{{ Avatar image=${avatar} isLoadAvatar=true }}}
                <h2 class="profile__avatar__name">${first_name} ${second_name}</h2>
            </div>
            ${user ?
            `<div class = "profile__main" >
                ${children}
            </div>`:''
            }
             ${withButton ?
                `<div class="profile__button">
                    {{{ Button caption="${buttonText}" onClick=onClickOk }}}
                </div>`:            
                `<div class="profile__buttons">
                    {{{Link caption="Change IUser Data" page="pageProfileEdit" type='success' linkLine=true  }}}
                    {{{Link caption="Change Password" page="pagePasswordEdit" type='success' linkLine=true  }}}
                    {{{Link caption="Cancel" page=button-page type='danger' }}}
                </div>`}
            </div>
            <div class="block-cancel">
                {{{ Button type="cancel" page="${buttonCancelPage}" }}}
            </div>
        `)
    }
}
