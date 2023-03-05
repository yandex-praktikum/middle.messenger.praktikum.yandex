import Block, { TProps } from '../../classes/Block';
import Input from '../input/input';
import templateSearchUsers from './searchUsers.hbs';
import './searchUsers.scss';

export default class SearchUsers extends Block {
    constructor(props: TProps) {
        const input = new Input({
            attr: {
                class: 'search form__input',
            },
            placeholder: 'Поиск',
            label: '<i class="fa fa-search"></i>',
            type: 'search',

        });
        const items: never[] = null;
        props = {
            ...props,
            input,
            items,
        };
        super('div', props, templateSearchUsers);
    }

    public _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            if (eventName === 'change') {
                this.events[eventName] = (e) => {
                    events[eventName](this, e.target.value ?? '');
                };
            } else if (eventName === 'click') {
                this.events[eventName] = (e) => {
                    const elem = e.target.closest('[data-key]');
                    if (!elem) return;
                    const key = elem?.dataset.key;
                    if (confirm(`Вы хотите создать новый чат с пользователем ${this.props.items[key].login}`)) {
                        events[eventName](this.props.items[key]);
                        this.setProps({ items: [] });
                        this.children.input.setProps({ value: '' });
                    };
                };
            } else {
                this.events[eventName] = events[eventName].bind('', this);
            }
            this._element.addEventListener(eventName, this.events[eventName]);
        });
    }

    render() {
        const fragment = document.createElement('template');
        const { items = null } = this.props;
        const { input } = this.children;
        fragment.content.append(input.getContent());
        const searchResultsBlock = document.createElement('div');
        searchResultsBlock.classList.add('search-results');
        searchResultsBlock.textContent = items === null ? '' : items.length === 0 ? 'По запросу ничего не найдено' : '';
        items?.forEach(({ login }, key: number) => {
            const itemBlock = document.createElement('div');
            itemBlock.dataset.key = String(key);
            itemBlock.className = 'result-item';
            itemBlock.textContent = login;
            searchResultsBlock.append(itemBlock);
        });
        fragment.content.append(searchResultsBlock);
        // });
        return fragment.content;
    }
}
