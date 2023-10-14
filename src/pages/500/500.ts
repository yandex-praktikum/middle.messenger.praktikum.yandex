import './500.sass';
import page500TMPL from './500.hbs?raw';
import Block from '../../core/Block';

export class Page500 extends Block {
    protected render(): string {
        return page500TMPL;
    }
}
