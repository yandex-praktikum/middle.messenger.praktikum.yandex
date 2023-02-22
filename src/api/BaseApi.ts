import { baseUrl } from '../utils/config';

export default class BaseAPI {
    baseUrl: string = baseUrl;
    constructor() {
        
    }
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create():any { throw new Error('Not implemented'); }

    request():any { throw new Error('Not implemented'); }

    update():any { throw new Error('Not implemented'); }

    delete():any { throw new Error('Not implemented'); }
}

