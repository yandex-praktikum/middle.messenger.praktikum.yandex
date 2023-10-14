import './avatar.sass';
import avatarTmpl from './avatar.hbs?raw';
import Block, { Props, TEvent } from '../../core/Block';

export class Avatar extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                ...(props.onClick ? { click: props.onClick as TEvent } : {}),
            },
        });
    }

    protected render(): string {
        return avatarTmpl;
    }
}
