import './input.sass';
import tmplInput from './input.hbs?raw';

import Block, { Props, TEvent } from '../../core/Block';

export class Input extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                ...(props.onBlur ? { blur: props.onBlur as TEvent } : {}),
                ...(props.onChange ? { change: props.onChange as TEvent } : {}),
                ...(props.onInput ? { input: props.onInput as TEvent } : {}),
                ...(props.onKeyDown ? { keydown: props.onKeyDown as TEvent } : {}),
            },
        });
    }

    protected render(): string {
        return tmplInput;
    }
}
