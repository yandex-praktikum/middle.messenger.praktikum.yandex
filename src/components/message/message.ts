import Block, { TProps } from '../../classes/Block';
import templateMessage from './message.hbs';
import './message.scss';

export default class Message extends Block {
    constructor(props: TProps) {
        super('div', props, templateMessage);
    }

    render() {
        return this.compile(this.props);
    }
}
