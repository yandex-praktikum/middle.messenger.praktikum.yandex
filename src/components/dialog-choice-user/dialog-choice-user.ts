import './dialog-choice-user.sass';
import dialogChoiceUserTmpl from './dialog-choice-user.hbs?raw';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { searchUsers } from '../../services/user';
import { transformToUser } from '../../utils/apiTransformers';
import { addUserToChat, deleteUserToChat } from '../../services/chat';
import { User } from '../../type';

interface Props {
    isOpenDialogChoiceUser: boolean,
    onChoiceUser: () => void,
    onChoice: () => void,
    onClose: () => void,
    error: string
}

class DialogChoiceUser extends Block {
    constructor(props: Props) {
        super({
            ...props,
            onChoiceUser: (event: { target:HTMLInputElement | null }) => {
                const { target } = event;
                if (target) {
                    searchUsers({ login: target.value });
                }
            },
            onChoice: (event: { target: HTMLButtonElement | null }) => {
                const { target } = event;
                const login = target?.innerText;
                if (login) {
                    const { searchChatUsers, currentChatUsers } = window.store.getState();
                    const user = (
                        this.props.loginSearch ? searchChatUsers : currentChatUsers
                    ).find((item) => item.login === login);

                    if (user) {
                        if (this.props.loginSearch) {
                            addUserToChat(transformToUser(user as User));
                        } else {
                            deleteUserToChat(transformToUser(user as User));
                        }
                        window.store.set({ isOpenDialogChoiceUser: false, searchChatUsers: [] });
                    }
                }
            },
            onClose: () => window.store.set({ isOpenDialogChoiceUser: false, searchChatUsers: [] }),
        });
    }

    public setError(error: string) {
        this.refs.errorLine.setProps({ error });
    }

    protected render(): string {
        return dialogChoiceUserTmpl;
    }
}

export default connect(({ isOpenDialogChoiceUser, loginSearch }) => ({
    isOpenDialogChoiceUser, loginSearch,
}))(DialogChoiceUser);
