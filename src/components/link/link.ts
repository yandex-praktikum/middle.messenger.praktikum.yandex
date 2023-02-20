import Block, { TProps } from '../../classes/Block';
import Router from '../../classes/Router';
import './link.scss';

export default class Link extends Block {
    constructor(props: TProps) {
        if (props.spa) {
            props = {
                ...props,
                events: {
                    click: (self, e) => {
                        e.preventDefault();
                        new Router().go(self.props.attr.href);
                    }
                }
            }
        }
        super('a', props);
    }

    render() {
        if (typeof this.props.text === 'string') return this.props.text;
        return '';
    }
}
