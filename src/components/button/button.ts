import './button.sass';
import tmplButton from './button.hbs?raw';
// import data from '../../data.json';

import Block, { Props, TEvent } from '../../core/Block';

export class Button extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (e) => {
                    if (props.onClick) {
                        props.onClick(e);
                    }
                },
            },
        });
        this.props.events = {
            click: this.props.onClick as TEvent || (() => {}),
        };
    }

    protected render(): string {
        return tmplButton;
    }
}
