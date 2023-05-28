import Block from "../core/Block";

type Props = {
    backText: string,
    events: { click: () => void },
};

class ErrorContainer extends Block {
    constructor(props: Props) {
        super({ ...props });
    };

    render() {
        return this.compile(`
            <a class="error__back">
                {{backText}}
            </a>
        `, { ...this.props });
    };
};

export default ErrorContainer;
