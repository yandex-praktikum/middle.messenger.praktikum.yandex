import {IProps,Block} from "../../utils/Block";

interface IInputProps extends IProps{
    type: 'text' | 'password',
    name: string,
    value: string,
    label: string,
    errorText: string,
    error:boolean ,
    onChange: (value: string) => void,
    validate: (value: string) => void,
    onBlur: (value: string) => void
}

export class InputShort extends Block {

    constructor(props:IInputProps) {
        props.errorText='';
        props.error=false;
        props.onBlur= () => this.validate();

        super({
            ...props,

        });

    }

    public value() {
        if (!this.validate()) {
            return false;
        }
        return this.refs?.[this.props.ref].value()
    }

    private validate() {
        const value =this.refs?.[this.props.ref].value();
        const error = this.props.validate(value);

        this.props.value=value;
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
        const {type = '', ref = '', value = '',  label = "",error=false,errorText=''} = this.props;

        return (`
            <div class="input">
                <label class="input__container">
                {{{ Input 
                    ref="${ref}"
                    type="${type}" 
                    classes="input__value  ${error ? "input__value-error" : ""}" 
                    value='${value}'
                    placeholder=" " 
                    name="input"
                    onBlur=onBlur
                }}}
                    
                    <div class="input__label">${label}</div>
                    ${error ? ` <div class="input__error">
                            <div class="input__text-error">${errorText}</div>
                        </div>` : ""
        }
                </label>
            </div>
        `)
    }
}
