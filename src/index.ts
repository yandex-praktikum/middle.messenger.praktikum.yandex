/* global document, a */
import templateIndex from './index.hbs';
import Block, { TProps } from './classes/Block';
import Nav from './components/nav/nav';
import './app.scss';
import HTTPTransport from './classes/HTTPTransport';
import Button from './components/button/button';

const testLink = 'https://jsonplaceholder.typicode.com/posts';
const testBody = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    data: {
        title: 'test',
        body: 'testBody',
        userId: 1,
    }
};
class IndexPage extends Block {
    constructor(props: TProps, templator: Function) {
        const getTest = new Button({
            attr: {
                class: 'btn',
            },
            text: 'Проверить GET',
            events: {
                click: () => HTTPTransport.get(testLink)
                    .then(({ response }) => console.log('Ответ:', JSON.parse(response)))
                    .catch(console.log),
            }
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
            }
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
        }




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
HTTPTransport.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
        console.log(response);


    })


