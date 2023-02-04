/* global document, a */
import templateIndex from './index.hbs';
import Block, { TProps } from './classes/Block';
import Nav from './components/nav/nav';
import './app.scss';
import { Link } from './components/link/link';
import { testInput } from './components/input/input';
import { testForm } from './components/form/form';


class IndexPage extends Block {
    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        if (oldProps.title !== newProps.title) return true;
        return false;
    }

    render() {
        return this.compile(this.props);
    }
}


const pageList: Array<Record<string, string>> = [
    {
        href: '/auth.html',
        text: 'Авторизация',
    },
    {
        href: '/reg.html',
        text: 'Регистрация',
    },
    {
        href: '/profile.html',
        text: 'Профиль',
    },
    {
        href: '/chat.html',
        text: 'Чат',
    },
    {
        href: '/404.html',
        text: '404',
    },
    {
        href: '/500.html',
        text: '500',
    },
];

const navs = new Nav({
    attr: {
        class: 'app__nav',
    },
    links: pageList,
});

const indexPage = new IndexPage({
    title: 'Список страниц',
    nav: navs,
    attr: {
        class: 'app__index-page',
    },
}, templateIndex);


const indexPageContent = indexPage.getContent() ?? '';
const otherNav = new Link({
    text: '123',
});

window.navs = navs;
window.index = indexPage;
window.onav = otherNav;
window.input = testInput;
const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(testForm.getContent());
}


// console.log(testInput.getContent());
