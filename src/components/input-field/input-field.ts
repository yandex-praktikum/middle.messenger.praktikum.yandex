import './input-field.sass';
import tmplInputField from './input-field.hbs?raw';
import Block, { Props } from '../../core/Block';

export class InputField extends Block {
    constructor(props: Props) {
        super({
            ...props,
            onBlur: () => this.validate(),
        });
    }

    private _value() {
        const input = this.refs?.input;
        if (input instanceof Block) {
            const { element } = input;
            if (element instanceof HTMLInputElement) {
                return element.value;
            }
        }
        return '';
    }

    public value() {
        if (!this.validate()) {
            return false;
        }

        return this._value();
    }

    public get name(): string {
        return this.props?.name as string | undefined || '';
    }

    private validate() {
        const value = this._value();
        // const error = this.props.validate?.(value);

        let error: string = '';
        const check = this.props?.validate as [Record<string, string>] || [];
        for (let i: number = 0; i < check.length && error === ''; i += 1) {
            if (check[i].regex && check[i].error) {
                const regexp = new RegExp(check[i].regex as string, 'gm');
                if (!regexp.test(value)) {
                    error = check[i].error as string;
                }
            }
        }

        if (error !== '') {
            const errorLine = this.refs.errorLine || null;
            if (errorLine instanceof Block) {
                errorLine.setProps({ error });
                return false;
            }
        }
        const errorLine = this.refs.errorLine || null;
        if (errorLine instanceof Block) {
            errorLine.setProps({ error: undefined });
        }
        return true;
    }

    protected render(): string {
        return tmplInputField;
    }
}
