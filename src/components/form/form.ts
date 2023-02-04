/* eslint-disable no-underscore-dangle */
import Block, { TProps } from '../../classes/Block';
import { Button } from '../button/button';
import Input from '../input/input';
import { Link } from '../link/link';
import templateForm from './form.hbs';
import './form.scss';

type TFormArg = {
    formTitle?: string,
    formItems?: Array<string | undefined>,
    formButtons?: Array<string | undefined>,
    label?: string,
    submit?: (f: any) => void,
    attr?: {}
}

export default function form({
    attr = {},
    formTitle = 'title',
    formItems = [],
    formButtons = [],
    submit = (f) => f,
}: TFormArg): string {
    return templateForm(
        {
            ...attr, formTitle, formItems: formItems.join(''), formButtons: formButtons.join(''),
        },
    );
}

type TFormProps = {
    items: Array<Block>,
    buttons: Array<Block>,
    propsOther: TProps,
}

export class Form extends Block {

    constructor(formProps: TFormProps, templator: Function = templateForm) {
        const { propsOther, buttons, items } = formProps;
        const props: TProps = {
            ...propsOther,
            formItems: '',
            formButtons: '',
        };

        items.forEach((item, key) => {
            props[item._id] = item;
            props.formItems += `<div data-id="${item._id}"></div>`;
        });
        buttons.forEach((item, key) => {
            props[item._id] = item;
            props.formButtons += `<div data-id="${item._id}"></div>`;
        });

        super('form', props, templator);
    }

    validation(self, e): void {
        if (!e.sourceCapabilities) return;
        const value = e.target.value;
        const component = self.children[e.target.dataset.idc];
        // const { required = false, minlength = 0, maxlength = 9999, mask = '' } = component.props.validation;
        const error = self.validator(component.props.validation, value);
        component.setProps({
            value,
            error,
        });
        self.onValidation();
        if (e.type === 'focusout' && e.target.tagName === 'INPUT') {

        }
        if (e.type === 'focusin' && e.target.tagName === 'INPUT') {
            component.getContent().focus();
        }
    }

    onValidation(): void {
        console.log(this);
    }


    validator(validData, value): string {
        let error = '';

        const { required = false, minlength = 0, maxlength = 9999, mask = '', validMsg = '' } = validData;
        if (required && !value) {
            error = 'Это обязательное поле';
        }
        if (mask && !mask.test(value)) {
            error = `Ошибка заполнения! ${validMsg}`;
        }
        if (value.length > maxlength || value.length < minlength) {
            error = `Неверная длина поля. Поле должно содержать от ${minlength} до ${maxlength} символов`;
        }
        if (!required && !value) error = '';
        console.log(error);
        return error;
    }

    onFocus(e): void {
        if (!e.sourceCapabilities) return;
        component.getContent().focus();
    }

    // _addEvents(): void {
    //     const form = this.getContent();
    //     console.log(this.props.events);
    //     if (!this.props.events) return;
    //     const eventFunc = this.props.events['input'].bind('', this);
    //     this.events['input'] = eventFunc;
    //     // form.addEventListener('input', this.events['input']);
    //     form.addEventListener('focusin', this.events['input']);
    //     // form.addEventListener('focusout', this.events['input']);
    //     // super._addEvents();
    // }

    // _removeEvents(): void {
    //     const form = this.getContent();
    //     console.log(this.events['input']);
        
    //     form.removeEventListener('input', this.events['input']);
    //     form.removeEventListener('focusin', this.events['input']);
    //     form.removeEventListener('focusout', this.events['input']);
    //     super._removeEvents();
    // }

    render() {
        return this.compile(this.props);
    }
}

export const testForm = new Form({
    propsOther: {
        formTitle: 'ФормаТест',
        attr: {
            class: 'test',
        },
    },
    items: [
        new Input({}),
        new Input({}),
    ],
    buttons: [
        new Button({}),
        new Link({}),
    ],
}, templateForm);
