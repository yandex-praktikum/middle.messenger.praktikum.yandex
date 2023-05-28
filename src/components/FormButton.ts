import Block from "../core/Block";

type Props = {
    text: string,
    events: {
        click: (e: Event) => void
    },
};

class FormButton extends Block {
    constructor(props: Props) {
        super({ ...props });
    };

    render() {
        return this.compile(`
            <button class="form-button" type="submit">
                {{text}}
            </button>
        `, { ...this.props });
    };
};

export default FormButton;
