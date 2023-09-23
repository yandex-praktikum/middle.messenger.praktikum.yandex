import './info-bar.sass';
import infoBarTmpl from './info-bar.hbs?raw';
import Block from '../../core/Block';

export class InfoBar extends Block {
    protected render(): string {
        return infoBarTmpl;
    }
}
