import Block from "../core/Block";

type Props = {
    text: string,
    events: {
        click: (e: Event) => void
    },
};

class LogoutButton extends Block {
    constructor(props: Props) {
        super({ ...props });
    };

    render() {
        return this.compile(`
            <a class="profile__cross-link profile__cross-error">
                {{text}}
            </a>
        `, { ...this.props });
    };
};

export default LogoutButton;
