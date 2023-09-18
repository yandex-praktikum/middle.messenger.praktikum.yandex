import Block from "../../utils/Block";

interface IInputProps {
    type: 'text' | 'password',
    name: string,
    value: string,
    label: string,
    onChange: (value: string) => void
    validate: (value: string) => void
}

export class InputShort extends Block {

    constructor(props:IInputProps) {
        super({
            ...props,
            errorText: '',
            error:false ,
            onBlur: () => this.validate()
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
            this.setProps({...this.props, errorText: error,error:true});
            return false;
        }
        this.setProps({...this.props, errorText: '',error:false} );
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
