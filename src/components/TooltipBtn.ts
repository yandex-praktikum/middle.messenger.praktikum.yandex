import Block from "../core/Block";

import setTooltipToggle from "../utils/setTooltipToggle";

class TooltipBtn extends Block {
    constructor() {
        super({
            events: {
                click: () => {
                    setTooltipToggle();
                },
            },
        });
    };

    render() {
        return this.compile(`
            <button class="chat__tooltip">
                <span></span>
                <span></span>
                <span></span>
            </button>
        `, { ...this.props });
    };
};

export default TooltipBtn;
