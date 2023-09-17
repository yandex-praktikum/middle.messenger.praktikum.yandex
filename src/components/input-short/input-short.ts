import Block from "../../utils/Block";

interface IInputProps {
    type: 'text' | 'button',
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
            errorText: '', error:false ,
            onBlur: () => this.validate()
        });

    }

    public value() {
        if (!this.validate()) {
            return false;
        }
        return this.refs?.input?.value()
    }

    private validate() {
        console.log(this)
        const value =this.refs?.input?.value();
        const error = this.props.validate(value);

        console.log('value,error',value,error)
        this.props.value=value;
        if (error) {
            this.setProps({...this.props, errorText: error,error:true});
            return false;
        }
        this.setProps({...this.props, errorText: '',error:false} );
        return true;
    }

    protected render(): string {
        const {type = '', name = '', value = '',  label = "",error=false,errorText=''} = this.props;

        return (`
            <div class="input">
                <label class="input__container">
                {{{ Input 
                    ref='input' 
                    type="${type}" 
                    classes="input__value  ${error ? "input__value-error" : ""}" 
                    value='${value}'
                    placeholder=" " 
                    name="${name}"
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
