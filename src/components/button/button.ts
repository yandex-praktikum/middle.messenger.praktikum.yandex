import Block, { TProps } from '../../classes/Block';
import './button.scss';


export default class Button extends Block {
    constructor(props: TProps) {
        super('button', props);
    }

    render() {
        if (typeof this.props.text === 'string') return this.props.text;
        return '';
    }
}
