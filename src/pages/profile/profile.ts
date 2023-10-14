import './profile.sass';
import profileTmpl from './profile.hbs?raw';
import Block, { Props } from '../../core/Block';
import { InputField } from '../../components/input-field/input-field';
import { connect } from '../../utils/connect';
import { goToChat } from '../../services/routes';
import { changePassword, changeProfile, changeUserAvatar } from '../../services/user';
import { logout } from '../../services/auth';

type DialogChangePassword = Block & {
    getValue: () => { oldPassword: string, newPassword: string } | false;
};

class ProfilePage extends Block {
    protected constructor(props: Props = {}) {
        super({
            ...props,
            onChangeTheData: (event: Event | undefined) => {
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

                this.refs.error.setProps({ error: undefined });
                if (!err) {
                    changeProfile({
                        login: dataForms.login as string,
                        first_name: dataForms.first_name as string,
                        second_name: dataForms.second_name as string,
                        display_name: dataForms.display_name as string,
                        phone: dataForms.phone as string,
                        email: dataForms.email as string,
                    }).catch((error) => this.refs.error.setProps({ error }));
                }
            },
            onBackToChat: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                goToChat();
            },
            onExit: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                logout();
            },
            onClickAvatar: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                this.onClickAvatar();
            },
            onChangeAvatar: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                const target: HTMLInputElement | null = event?.target as HTMLInputElement | null;
                if (target && target.files) {
                    this.onChangeAvatar(target.files[0]);
                }
            },
            openDialogPassword: () => window.store.set({ isOpenDialogPassword: true }),
            onClosePassword: () => window.store.set({ isOpenDialogPassword: false }),
            onSavePassword: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();

                this.refs.error.setProps({ error: undefined });
                const dialogPassword = this.refs.changePassword as DialogChangePassword;
                const value = dialogPassword.getValue();
                if (value) {
                    changePassword(value)
                        .then(() => window.store.set({ isOpenDialogPassword: false }))
                        .catch((error) => this.refs.error.setProps({ error }));
                }
            },
        });
    }

    onClickAvatar() {
        const loadAvatar: HTMLInputElement | undefined = this.element?.querySelector('#loadAvatar') as HTMLInputElement | undefined;
        if (loadAvatar) {
            loadAvatar.click();
        }
    }

    onChangeAvatar(file: File) {
        changeUserAvatar(file);
    }

    protected render(): string {
        return profileTmpl;
    }
}

export default connect(({ user }) => ({ user }))(ProfilePage);
