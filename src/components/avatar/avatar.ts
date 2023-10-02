import './avatar.sass';
import avatarTmpl from './avatar.hbs?raw';
import Block from '../../core/Block';

export class Avatar extends Block {
    protected render(): string {
        return avatarTmpl;
    }
}
