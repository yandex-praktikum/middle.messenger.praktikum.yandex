/* eslint-disable no-undef */
import templateIndex from './index.hbs';
import '../../assets/style/app.scss';
import Block, { TProps } from '../../classes/Block';
import HTTPTransport from '../../classes/HTTPTransport';
import Button from '../../components/button/button';
import Nav from '../../components/nav/nav';

const testLink = 'https://jsonplaceholder.typicode.com/posts';
const testBody = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    data: {
        title: 'test',
        body: 'testBody',
        userId: 1,
    },
};

type TIndexPage = {
    title?: string,
    attr?: Record<string, string>,
    nav?: Nav,
}
class IndexPage extends Block {
    constructor(props: TIndexPage, templator: Function) {
        const getTest = new Button({
            attr: {
                class: 'btn',
            },
            text: 'Проверить GET',
            events: {
                click: () => HTTPTransport.get(testLink)
                    .then(({ response }) => console.log('Ответ:', JSON.parse(response)))
                    .catch(console.log),
            },
        });

        const postTest = new Button({
            attr: {
                class: 'btn',
            },
            text: 'Проверить POST',
            events: {
                click: () => HTTPTransport.post(testLink, testBody)
                    .then(({ response }) => console.log('Ответ:', JSON.parse(response)))
                    .catch(console.log),
            },
        });

        const putTest = new Button({
            attr: {
                class: 'btn',
            },
            text: 'Проверить PUT',
            events: {
                click: () => HTTPTransport.put(`${testLink}/1`, testBody)
                    .then(({ response }) => console.log('Ответ:', JSON.parse(response)))
                    .catch(console.log),
            },
        });

        const deleteTest = new Button({
            attr: {
                class: 'btn',
            },
            text: 'Проверить Delete',
            events: {
                click: () => HTTPTransport.delete(`${testLink}/1`, testBody)
                    .then(({ response }) => console.log('Ответ:', JSON.parse(response)))
                    .catch(console.log),
            },
        });

        const nextProps = {
            ...props,
            getTest,
            postTest,
            putTest,
            deleteTest,
        };

        super('main', nextProps, templator);
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

const nav = new Nav({
    attr: {
        class: 'app__nav',
    },
    links: pageList,
});

const indexPage = new IndexPage({
    title: 'Список страниц',
    nav,
    attr: {
        class: 'app__index-page',
    },
}, templateIndex);


const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(indexPage.getContent());
}
