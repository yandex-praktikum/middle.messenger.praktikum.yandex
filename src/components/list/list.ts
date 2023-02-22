import Block, { TProps } from '../../classes/Block';
import './list.scss';

export default class List extends Block {
    constructor(props: TProps) {
        super('ul', props);
    }
    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        console.log(_newProps);
        
        return true;
    }
    render() {
        
        // eslint-disable-next-line no-undef
        const fragment = document.createElement('template');
        const { items = [], attr = {} } = this.props;
        const className = attr.class ?? 'list';
        if (!items) return fragment.content;
        console.log(className);
        
        items.forEach((item: Record<string, unknown>) => {
            fragment.innerHTML += `<li class='${className}__li'>${item}</li>`;
        });
        return fragment.content;
    }
}
