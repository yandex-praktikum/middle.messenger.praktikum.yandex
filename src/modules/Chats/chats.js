import chats from '../../pages/chats.hbs';
import './chats.scss';

export default class Chats {
    container;
    template;

    constructor(container) {
        this.container = container;
    }

    render() {
        const data = {
            
        };

        this.container.innerHTML = chats(data);
    }
}
