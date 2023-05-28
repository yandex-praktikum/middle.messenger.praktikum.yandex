import Block from "../core/Block";

type Props = {
    text: string,
    events: {
        click: (e: Event) => void,
    },
};

class TooltipItem extends Block {
    constructor(props: Props) {
        super({ ...props, });
    };

    render() {
        return this.compile(`
            <span class="chat__tooltip-item">
                {{text}}
            </span>
        `, { ...this.props });
    };
};

export default TooltipItem;
