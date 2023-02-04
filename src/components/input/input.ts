import Block, { TProps } from '../../classes/Block';
import templateInput from './input.hbs';
import './input.scss';

export default class Input extends Block {
    // dataInput: {};

    constructor(props: TProps, extendData?: {}) {
        super('label', props, templateInput);
    }

    // _addEvents(): void {
    //     const { events = {} } = this.props;
    //     if (!events) return;
    //     Object.keys(events).forEach((eventName) => {
    //         const eventFunc = events[eventName].bind('', this);
    //         this.currentEvents[eventName] = eventFunc;
    //         this._element.addEventListener(eventName, eventFunc);
    //     });
    // }

    // _removeEvents(): void {
    //     const events = this._prevProps?.events ?? {};
    //     Object.keys(events).forEach((eventName) => {
    //         this._element.removeEventListener(eventName, this.currentEvents[eventName]);
    //     });
    // }


    render() {
        return this.compile({ ...this.props, data_idc: this._id });
    }
}

export const testInput = new Input({
    attr: {
        class: 'label',
    },
    label: 'label',
    validate: true,
    name: 'name',
    type: 'text',
    placeholder: 'placeholder',
    value: 'default',
    error: 'msg',
    required: true,

});
