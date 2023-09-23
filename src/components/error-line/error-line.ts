import './error-line.sass';
import tmplErrorLine from './error-line.hbs?raw';
import Block from '../../core/Block';

export class ErrorLine extends Block {
    protected render(): string {
        return tmplErrorLine;
    }
}
