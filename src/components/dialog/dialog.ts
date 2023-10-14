import './dialog.sass';
import Block from '../../core/Block';
import dialogTmpl from './dialog.hbs?raw';

export class Dialog extends Block {
    protected render(): string {
        return dialogTmpl;
    }
}
