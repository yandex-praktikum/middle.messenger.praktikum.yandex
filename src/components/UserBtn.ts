import Block from "../core/Block";

type Props = {
    text: string,
    events: { click: (e: Event) => void },
};

class UserBtn extends Block {
    constructor(props: Props) {

        super({ ...props });
    };

    render() {
        return this.compile(`
            <button class="chat__user-options-btn">
                {{text}}
            </button>
        `, { ...this.props });
    };
};

export default UserBtn;
