import './search.sass';
import searchTmpl from './search.hbs?raw';
import Block from '../../core/Block';

export class Search extends Block {
    protected render(): string {
        return searchTmpl;
    }
}
