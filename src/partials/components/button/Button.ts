import { Block } from "../../../core";

interface ButtonProps {
    mod: string;
    value: string;
    type?: string;
    onClick?: () => void;
}

class Button extends Block {
    static componentName = "Button";

    constructor({ mod, value, type, onClick }: ButtonProps) {
        super({ mod, value, type, events: { click: onClick } });
    }

    protected render() {
        return `
            <button class="button {{mod}}" type={{type}}>
                {{value}}
            </button>
        `;
    }
}

export default Button;
