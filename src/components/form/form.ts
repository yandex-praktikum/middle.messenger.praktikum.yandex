import Block, { TProps } from '../../classes/Block';
import Input from '../input/input';
import templateForm from './form.hbs';
import './form.scss';


type TFormProps = {
    formTitle?: string,
    attr?: Record<string, string>,
    events?: Record<string, Function>
    items: Array<Block>,
    buttons: Array<Block>,
}

export default class Form extends Block {
    constructor(formProps: TFormProps, templator: Function = templateForm) {
        const { buttons = [], items = [], ...propsOther } = formProps;
        const props: TProps = {
            ...propsOther,
            formItems: '',
            formButtons: '',
        };

        items.forEach((item) => {
            const id = item._id ?? '';
            props[id] = item;
            props.formItems += `<div data-id="${id}"></div>`;
        });
        buttons.forEach((item) => {
            const id = item._id ?? '';
            props[id] = item;
            props.formButtons += `<div data-id="${id}"></div>`;
        });

        super('form', props, templator);
    }

    getFormData(): void {
        const formData: Record<string, string> = {};

        Object.values(this.children).forEach((child) => {
            if (child instanceof Input) {
                formData[child.props.name] = String(child.currentValue);
            }
        });
        // eslint-disable-next-line no-console
        console.log(formData);
    }

    render() {
        return this.compile(this.props);
    }
}
