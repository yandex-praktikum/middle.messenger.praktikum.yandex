import './dialog-change-password.sass';
import dialogCreateChatTmpl from './dialog-change-password.hbs?raw';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { InputField } from '../input-field/input-field';

interface Props {
    isOpenDialogPassword: boolean,
    onSave: () => void,
    onClose: () => void,
    error: string
}

class DialogChangePassword extends Block {
    constructor(props: Props) {
        super({
            ...props,
            validateRepeatPassword: (value: string) => this.validateRepeatPassword(value),
        });
    }

    getValue() {
        const inputFieldOldPassword = this.refs.old_password as InputField;
        const oldPassword = inputFieldOldPassword?.value();

        const inputFieldPassword = this.refs.password as InputField;
        const newPassword = inputFieldPassword?.value();

        const inputFieldRepeatPassword = this.refs.repeat_password as InputField;
        const repeatPassword = inputFieldRepeatPassword?.value();

        if (newPassword && repeatPassword && oldPassword) {
            return { oldPassword, newPassword };
        }
        return false;
    }

    validateRepeatPassword(value: string):boolean {
        const inputFieldPassword = this.refs.password as InputField;
        const password = inputFieldPassword?.value();

        const inputFieldRepeatPassword = this.refs.repeat_password as InputField;
        if (password !== value) {
            inputFieldRepeatPassword.setError('Пароли должны совпадать');
            return false;
        }
        inputFieldRepeatPassword.setError(undefined);
        return true;
    }

    public setError(error: string) {
        this.refs.errorLine.setProps({ error });
    }

    protected render(): string {
        return dialogCreateChatTmpl;
    }
}

export default connect(({ isOpenDialogPassword }) => (
    { isOpenDialogPassword }
))(DialogChangePassword);
