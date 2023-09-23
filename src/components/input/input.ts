import './input.sass';
import tmplInput from './input.hbs?raw';

import Block, { Props } from '../../core/Block';

export class Input extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {}),
            },
        });
    }

    protected render(): string {
        return tmplInput;
    }
}
