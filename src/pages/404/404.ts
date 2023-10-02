import './404.sass';
import page404TMPL from './404.hbs?raw';
import Block from '../../core/Block';

export class Page404 extends Block {
    protected render(): string {
        return page404TMPL;
    }
}
