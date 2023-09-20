import{IProps,Block} from "../../utils/Block";

interface IInputWideProps extends IProps{
    type: 'text' | 'button',
    name: string,
    value: string,
    label: string,
    validate: (value: string) => string,
    readOnly: boolean,
    noLine: boolean,
    onBlur: () => void,
    errorText: string,
    error:boolean ,
}

export class InputWide extends Block {


    constructor(props: IInputWideProps) {
        props.errorText='';
        props.error=false;
        props.onBlur= () => this.validate();
        super({
            ...props
        });
    }
    public get props(){
        return this._props as IInputWideProps;
    }
    public value() {
        if (!this.validate()) {
            return '';
        }
        return this.refs?.input?.value()
    }

    private validate() {
        console.log(this)
        const value = this.refs?.input?.value();
        const error = this.props.validate(value);

        console.log('value,error', value, error)
        this.props.value = value;

        if (error) {
            this.props.error=true;
            this.props.errorText=error;
            this.setProps(this.props);
            return false;
        }
        this.props.error=false;
        this.props.errorText='';
        this.setProps(this.props);
        return true;
    }

    protected render(): string {
        const {
            type = '',
            name = '',
            value = '',
            label = "",
            error = false,
            errorText = '',
            readOnly = false,
            noLine = false
        } = this.props;

        return (`
            <div class="input-wide">
                <label class="input-wide__container
                 ${noLine ? `input-wide__container-noline` : ""}">
                    <div class="input-wide__label"><span>${label}</span></div>
                    ${readOnly ? `<span class="input-wide__text">${value}</span>` : ""}
                     {{{ Input 
                            ref='input' 
                            type="${type}" 
                            classes="input-wide__value ${error ? "input__value-error" : ""}
                                    ${readOnly ? "input__value-disabled" : ""}" 
                            value='${value}'
                            placeholder=" " 
                            name="${name}"
                            onBlur=onBlur
                     }}}
                </label>
                 ${error ? ` <div class="input-wide__error">
                            <div class="input-wide__text-error">${errorText}</div>
                        </div>` : ""}
            </div>
        `)
    }
}
