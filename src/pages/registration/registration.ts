import './registration.sass';
import Registration from './registration.hbs?raw';
import Block, { Props } from '../../core/Block';
import { InputField } from '../../components/input-field/input-field';
import { signup } from '../../services/auth';
import { goToLogin } from '../../services/routes';

export class RegistrationPage extends Block {
    protected constructor(data: Props = {}) {
        super({
            data,
            onRegistration: (event: Event | undefined) => {
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
                    signup({
                        login: dataForms.login as string,
                        first_name: dataForms.first_name as string,
                        second_name: dataForms.second_name as string,
                        phone: dataForms.phone as string,
                        email: dataForms.email as string,
                        password: dataForms.password as string,
                    }).catch((error) => this.refs.error.setProps({ error }));
                }
            },
            onExit: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                goToLogin();
            },
        });
    }

    protected render(): string {
        return Registration;
    }
}
