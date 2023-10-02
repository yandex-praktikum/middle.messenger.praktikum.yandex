import './chat-footer.sass';
import chatFooterTmpl from './chat-footer.hbs?raw';
import Block, { Children, Props } from '../../core/Block';
import { InputField } from '../input-field/input-field';

export class ChatFooter extends Block {
    protected constructor(data: Props | Children = {}) {
        super({
            ...data,
            onSend: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();

                const children = Object.values(this.refs);
                const dataForms: Record<string, string | false> = {};
                children.forEach((child) => {
                    if (child instanceof InputField) {
                        dataForms[child.name] = child.value();
                    }
                });
                // eslint-disable-next-line no-console
                console.log(dataForms);
            },
        });
    }

    protected render(): string {
        return chatFooterTmpl;
    }
}
