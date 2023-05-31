import Block, { TProps } from '../../classes/Block';
import './list.scss';

export default class List extends Block {
    constructor(props: TProps) {
        super('ul', props);
    }

    render() {
        // eslint-disable-next-line no-undef
        const fragment = document.createElement('template');
        const { items = [], attr = {} } = this.props;
        const className = attr.class ?? '';
        if (!items) return fragment.content;
        items.forEach((item: Record<string, unknown>) => {
            fragment.innerHTML += `<li class='${className}__li'>${item}</li>`;
        });
        return fragment.content;
    }
}
