import '../../assets/style/app.scss';
import './error.scss';

import templateErrorPage from './error.hbs';
import Block, { TProps } from '../../classes/Block';
import Link from '../../components/link/link';

export default class ErrorPage extends Block {
    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
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
let error = {};

// eslint-disable-next-line no-undef
if (window?.errorPage === 500) {
    error = {
        title: '500',
        subtitle: 'Мы уже фиксим',
    };
} else {
    error = {
        title: '404',
        subtitle: 'не туда попали',
    };
}

const error404 = new ErrorPage({
    ...error,
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
}, templateErrorPage);

// eslint-disable-next-line no-undef
const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(error404.getContent());
}
