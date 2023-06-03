import { Block } from "../../../core";

interface InputProps {
    title: string;
    name: string;
    type: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

class Input extends Block {
    static componentName = "Input";

    constructor({ onFocus, onBlur, ...props }: InputProps) {
        super({ ...props, events: { focus: onFocus, blur: onBlur } });
    }

    protected render() {
        return `
            <input class="entry__input" type="{{ type }}" name="{{ name }}" placeholder="{{ title }}" autocomplete="off">
        `;
    }
}

export default Input;
