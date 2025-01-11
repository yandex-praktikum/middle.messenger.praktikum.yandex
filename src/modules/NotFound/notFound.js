import notFound from '../../pages/notFound.hbs';
import './notFound.scss';
import Handlebars from "handlebars";
import Error from '../../components/Error/error.js';
import { onCustomEvent } from '../../utils/event.js';

Handlebars.registerPartial('Error', Error);

export default class NotFound {
    container;
    template = document.getElementById('notFound');
    code;

    constructor(container, code = 500) {
        this.container = container;
        this.code = code;
    }

    render() {
        const data = {
            code: this.code,
            text: this.textByCode(this.code)
        };

        this.container.innerHTML = notFound(data);

        document.getElementById('error__link').addEventListener('click', event => {
            onCustomEvent('chats')
        });
    }

    textByCode(code) {
        return Number(code) === 404 ? 'Страница не найдена' : 'Ошибка на стороне сервера';
    }
}
