import Block from "../core/Block";

type Props = {
    events: { click: (e: Event) => void },
};

class AddMessageBtn extends Block {
    constructor(props: Props) {

        super({ ...props });
    };

    render() {
        return this.compile(`
            <button class="chat__message-btn" type="submit">
                Отправить
            </button>
        `, { ...this.props });
    };
};

export default AddMessageBtn;
