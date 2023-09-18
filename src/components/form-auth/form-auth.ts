import Block from "../../utils/Block";
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone
} from "../../utils/validates.utils.ts";

interface IFormAuthProps {
    caption: string,
    children: string,
    onClickOkButton: (event:Event) => void,
    onClickCancelButton: (event:Event) => void,
    captionOk: string,
    captionCancel: string,
    pageOk:string,
    pageCancel:string
}
export class FormAuth extends Block {
    constructor(props:IFormAuthProps) {
        super({
            ...props,
            validate: {
                login: validateLogin,
                password: validatePassword,
                password2: validatePassword,
                first_name:validateName,
                second_name:validateName,
                phone:validatePhone,
                email:validateEmail,
            },
            onClickOk: (event:Event)=>{
                console.log('OK')
                props.onClickOkButton(event)
            }
        });
    }

    protected render(): string {
        const {caption='Login',children='',onClickCancelButton,captionOk,captionCancel,pageCancel}=this.props;
        return(`
            <div class="container-form container-shadow">
            <h2 class="container-form__header">
                ${caption}
            </h2>
            <div>
                ${children}
            </div>
            <div class="container-form__buttons">
                {{{ Button caption="${captionOk}"  onClick=onClickOk }}}
                {{{ Link caption="${captionCancel}" page="${pageCancel}" onClick=${onClickCancelButton} }}}
            </div>
        </div>
        `)
    }
}
