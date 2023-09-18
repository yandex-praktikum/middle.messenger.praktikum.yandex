import Block from "../../utils/Block";

interface IFormAuthProps {
    caption: string,
    children: string,
    onClickOkButton: (event:any) => void,
    onClickCancelButton: (event:any) => void,
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
                login: (value: string) => {
                    console.log(value)
                    return  value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
                },
                password: (value: string) => {
                    console.log(value)
                    return  value.length < 6 && value.length !== 0 ? `Length of password should not be less 6 letters.` : ''
                }
            },
            onClickOk: (event:any)=>{
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
