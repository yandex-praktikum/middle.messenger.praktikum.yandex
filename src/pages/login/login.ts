import './login.sass';
import loginTmpl from './login.hbs?raw';
import Block, { Props } from '../../core/Block';
import { InputField } from '../../components/input-field/input-field';
import { signin } from '../../services/auth';
import { goToRegistration } from '../../services/routes';

export class LoginPage extends Block {
    protected constructor(data: Props = {}) {
        super({
            data,
            onLogin: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();

                const children = Object.values(this.refs);
                const dataForms: Record<string, string | false> = {};
                let err = false;
                children.forEach((child) => {
                    if (child instanceof InputField) {
                        dataForms[child.name] = child.value();
                        if (child.value() === false) {
                            err = true;
                        }
                    }
                });

                this.refs.error.setProps({ error: '' });
                if (!err) {
                    signin({
                        login: dataForms.login as string,
                        password: dataForms.password as string,
                    })
                        .catch((error) => this.refs.error.setProps({ error }));
                }
            },
            onRegistration: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                goToRegistration();
            },
        });
    }

    protected render(): string {
        return loginTmpl;
    }
}
