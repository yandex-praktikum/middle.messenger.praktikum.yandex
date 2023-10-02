import './login.sass';
import loginTmpl from './login.hbs?raw';
import Block, { Props, Children } from '../../core/Block';
import { InputField } from '../../components/input-field/input-field';

export class LoginPage extends Block {
    protected constructor(data: Props | Children = {}) {
        super({
            data,
            onLogin: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();

                const children = Object.values(this.refs);
                const dataForms: Record<string, string | false> = {};
                children.forEach((child) => {
                    if (child instanceof InputField) {
                        dataForms[child.name] = child.value();
                    }
                });
                // eslint-disable-next-line no-console
                console.log(dataForms);
            },
        });
    }

    protected render(): string {
        return loginTmpl;
    }
}
