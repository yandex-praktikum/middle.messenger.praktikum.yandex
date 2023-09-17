import Block from "../../utils/Block";

interface IInputWideProps {
    type: 'text' | 'button',
    name: string,
    value: string,
    label: string,
    validate: (value: string) => void,
    readOnly: boolean,
    noLine: boolean
}

export class InputWide extends Block {

    constructor(props: IInputWideProps) {
        super({
            ...props,
            errorText: '', error: false,
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
        const value = this.refs?.input?.value();
        const error = this.props.validate(value);

        console.log('value,error', value, error)
        this.props.value = value;
        if (error) {
            this.setProps({...this.props, errorText: error, error: true});
            return false;
        }
        this.setProps({...this.props, errorText: '', error: false});
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
