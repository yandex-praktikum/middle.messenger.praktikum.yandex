import Block from "../core/Block";

import { onBlur, onFocus } from "../utils/events";

import FormInput from "./FormInput";

type Props = {
    type: string,
    name: string,
    title: string,
    value?: string,
    disabled?: string,
};

class EntryItem extends Block {
    constructor(props: Props) {

        const formInput = new FormInput({
            type: props.type,
            name: props.name,
            title: props.title,
            value: props.value,
            disabled: props.disabled,
            events: {
                focus: (e: Event) => {
                    onFocus(e);
                },
                blur: (e: Event) => {
                    onBlur(e, props.name);
                },
            },
        });

        super({ formInput, ...props });
    };

    render() {
        return this.compile(`
            <li class="entry__item">
                {{{formInput}}}
                <span class="entry__error form__error">
                </span>
            </li>
        `, { ...this.props });
    };
};

export default EntryItem;
