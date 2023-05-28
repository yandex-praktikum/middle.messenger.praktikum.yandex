import Block from "../core/Block";

type Props = {
    text: string,
    events: { click: (e: Event) => void },
};

class FindUserBtn extends Block {
    constructor(props: Props) {

        super({ ...props });
    };

    render() {
        return this.compile(`
            <button class="chat__addUser-inputBtn" type="submit">
                {{text}}
            </button>
        `, { ...this.props });
    };
};

export default FindUserBtn;
