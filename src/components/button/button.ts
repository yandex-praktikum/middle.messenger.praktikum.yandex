import './button.sass';
import tmplButton from './button.hbs?raw';
// import data from '../../data.json';

import Block, { Props } from '../../core/Block';

export class Button extends Block {
    constructor(props: Props) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {}),
        };
    }

    protected render(): string {
        return tmplButton;
    }
}
