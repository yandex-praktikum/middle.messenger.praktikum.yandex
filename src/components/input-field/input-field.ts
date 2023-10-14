import './input-field.sass';
import tmplInputField from './input-field.hbs?raw';
import Block, { Props } from '../../core/Block';
import { Input } from '../input/input';

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

    public setValue(value:string) {
        const input = this.refs?.input as Input || undefined;
        if (input) {
            const inputHtml = input?.element as HTMLInputElement || undefined;
            if (inputHtml) {
                inputHtml.value = value;
            }
        }
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

    public setError(error: string | undefined) {
        const errorLine = this.refs.errorLine || null;
        if (errorLine instanceof Block) {
            errorLine.setProps({ error });
        }
    }

    private validate() {
        if (this.props._validate) {
            return this.props._validate(this._value()) as boolean;
        }

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
