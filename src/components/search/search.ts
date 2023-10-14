import './search.sass';
import searchTmpl from './search.hbs?raw';
import Block, { Props } from '../../core/Block';

export class Search extends Block {
    constructor(props: Props) {
        super({
            ...props,
            onInput: props.onInput,
        });
    }

    protected render(): string {
        return searchTmpl;
    }
}
