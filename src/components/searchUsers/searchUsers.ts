/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import Input from '../input/input';
import './searchUsers.scss';


export type TSearchItem = Record<string, string | number | null | boolean>;
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
        const items: Array<TSearchItem> | [] | null = null;
        props = {
            ...props,
            input,
            items,
        };
        super('div', props);
    }

    public _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            if (eventName === 'change') {
                this.events[eventName] = (e: Event) => {
                    const target = e?.target as HTMLInputElement;
                    events[eventName](this, target?.value ?? '');
                };
            } else if (eventName === 'click') {
                this.events[eventName] = (e: Event) => {
                    const target = e?.target as HTMLInputElement;
                    const elem = target.closest('[data-key]') as HTMLElement;
                    if (!elem) return;
                    const key = elem?.dataset.key ?? '';
                    events[eventName](this.props.items[key]);
                    this.setProps({ items: [] });
                    this.children.input.setProps({ value: '' });
                };
            } else {
                this.events[eventName] = events[eventName].bind('', this);
            }
            this.getContent().addEventListener(eventName, this.events[eventName]);
        });
    }

    render(): DocumentFragment {
        const fragment = document.createElement('template');
        const { items = null } = this.props;
        const { input } = this.children;
        fragment.content.append(input.getContent());
        const searchResultsBlock = document.createElement('div');
        searchResultsBlock.classList.add('search-results');
        if (items === null || items.length) {
            searchResultsBlock.textContent = '';
        } else {
            searchResultsBlock.textContent = 'По запросу ничего не найдено';
        }
        items?.forEach((item: TSearchItem, key: number) => {
            const itemBlock = document.createElement('div');
            itemBlock.dataset.key = String(key);
            itemBlock.className = 'result-item';
            const text = typeof item.login === 'string' ? item.login : '';
            itemBlock.textContent = text;
            searchResultsBlock.append(itemBlock);
        });
        fragment.content.append(searchResultsBlock);
        // });
        return fragment.content;
    }
}
