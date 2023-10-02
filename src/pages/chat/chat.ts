import './chat.sass';
import chatTmpl from './chat.hbs?raw';
import Block, { Props, Children } from '../../core/Block';
import { InputField } from '../../components/input-field/input-field';

export class ChatPage extends Block {
    protected constructor(data: Props | Children = {}) {
        super({
            data,
            chats: [{ data: 'common', ref: 'common' }, { data: 'private', ref: 'private' }],
            onLogin: (event: Event | undefined) => {
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
        return chatTmpl;
    }
}
