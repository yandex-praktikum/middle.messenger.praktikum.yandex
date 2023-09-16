import Block from "../../utils/Block";

interface IInputProps {
    type: 'text' | 'button',
    name: string,
    value: string,
    error: boolean,
    label: string,
    errorText: string,
    onChange: (value: string) => void
    validate: (value: string) => void
}

export class Input extends Block {

    constructor(props:IInputProps) {
        super({
            ...props,
            onblur: () => this.validate()
        });
        //this.error={ errorText: '',error:false };
    }

    public value() {
        if (!this.validate()) {
            return false;
        }
        return this.refs.input._element.value
    }

    private validate() {
        const value = this.refs.input._element.value;
        const error = this.props.validate(value);
        if (error) {
           // this.error={ errorText:error,error:true };
            return false;
        }
        //this.error={ errorText: '',error:false };
        return true;
    }

    protected render(): string {
        const {type = '', name = '', value = '',  label = "",error=false,errorText=''} = this.props;
        //const {error=false,errorText=''}=this.error;
        return (`
            <div class="input">
                <label class="input__container">
                    <input
                            class="input__value  ${error ? "input__value-error" : ""}"
                            placeholder=""
                            name="${name}"
                            value="${value}"
                            type="${type}"
                            ref="input"
                    />
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
