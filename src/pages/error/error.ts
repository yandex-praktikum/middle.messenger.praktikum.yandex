/* eslint-disable max-classes-per-file */
import '../../assets/style/app.scss';
import './error.scss';

import templateErrorPage from './error.hbs';
import Block, { TProps } from '../../classes/Block';
import Link from '../../components/link/link';

class ErrorPage extends Block {
    constructor(props: TProps) {
        props = {
            ...props,
            attr: {
                class: 'app__error-page',
            },
            backlink: new Link({
                text: 'Назад к чатам',
                attr: {
                    href: '/chat.html',
                    class: 'link',
                },
            }),
        };
        super('main', props, templateErrorPage);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        if (oldProps.title !== newProps.title) return true;
        if (oldProps.subtitle !== newProps.subtitle) return true;
        return false;
    }

    render() {
        return this.compile(this.props);
    }
}

export class Error404Page extends ErrorPage {
    constructor() {
        super({
            title: '404',
            subtitle: 'не туда попали',
        });
    }
}
export class Error500Page extends ErrorPage {
    constructor() {
        super({
            title: '500',
            subtitle: 'Мы уже фиксим',
        });
    }
}
