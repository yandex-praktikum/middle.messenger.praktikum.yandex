import Block from "../core/Block";

type Props = {
    events: { click: (e: Event) => void },
};

class CreateChatBtn extends Block {
    constructor(props: Props) {

        super({ ...props });
    };

    render() {
        return this.compile(`
            <button class="chat__create-btn" type="submit">
                +
            </button>
        `, { ...this.props });
    };
};

export default CreateChatBtn;
