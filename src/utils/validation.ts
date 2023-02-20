import Block from '../classes/Block';
import Form from '../components/form/form';
import Input, { TValidation } from '../components/input/input';

export const LOGIN_REGEX: RegExp = /^[A-Za-z][A-Za-z1-9\-_]{2,19}$/;
export const PASSWORD_REGEX: RegExp = /.*[A-ZА-Я1-9].*[A-ZА-Я1-9].*/;
export const EMAIL_REGEX: RegExp = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
export const PHONE_REGEX: RegExp = /^\+?\d{9,14}$/;
export const FIRST_NAME_REGEX: RegExp = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const SECOND_NAME_REGEX: RegExp = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const DISPLAY_NAME_REGEX: RegExp = /^[1-9A-ZА-Яa-zа-я\-ъ]{0,254}$/;

export function validator(validData: TValidation = {}, value: string | number, confirmValue?: string | undefined): string {
    let error = '';
    // eslint-disable-next-line no-param-reassign
    value = String(value);
    const {
        required = false, minlength = 0, maxlength = 9999, mask = '', validMsg = '',
    } = validData;
    if (confirmValue !== undefined && (confirmValue !== value)) {
        return `Ошибка заполнения! ${validMsg}`;
    }
    if (required && !value) {
        error = 'Это обязательное поле';
    }
    if (mask && !mask.test(value)) {
        error = `Ошибка заполнения! ${validMsg}`;
    }
    if ((value.length > maxlength || value.length < minlength)) {
        error = `Неверная длина поля. Поле должно содержать от ${minlength} до ${maxlength} символов`;
    }
    if (!required && !value) error = '';
    return error;
}

function getConfirmField(self: Form, component: Input): string | undefined {
    if (!component.props.validation.confirm) return undefined;
    // eslint-disable-next-line no-undef
    const confirmElement = self.getContent().querySelector(`[name=${component.props.validation.confirm}]`) as HTMLInputElement;
    const confirmValue = confirmElement.value ?? '';
    return confirmValue;
}

function getValidData(self: Form, e: Event): [Block, string, string | undefined] | [] {
    // eslint-disable-next-line no-undef
    const target = e?.target as HTMLInputElement;
    const value = target?.value;
    const id = target?.dataset.idc;
    if (!id) return [];
    const component = self.children[id];
    return [component, value, getConfirmField(self, component)];
}


export function onFocus(self: Form, e: Event) {
    const [component, value = '', confirmValue] = getValidData(self, e);
    if (!component) return;
    const error = validator(component.props.validation, value, confirmValue);
    component.setProps({
        error,
    });
}
export function onBlur(self: Form, e: Event): void {
    const [component, value = '', confirmValue] = getValidData(self, e);
    if (!component) return;
    const error = validator(component.props.validation, value, confirmValue);
    component.setProps({
        error,
    });
    component.setProps({
        error,
    });
}
export function onInput(self: Form, e: Event): void {
    const [component, value = '', confirmValue] = getValidData(self, e);
    if (!component) return;
    const error = validator(component.props.validation, value, confirmValue);
    component.setProps({
        error,
    });
}
export function onSubmit(self: Form, e: Event, sendFunc: Function = (f:any) => f): void {
    e.preventDefault();
    if (!self.children) return;
    let send = true;
    Object.values(self.children).forEach((child: Block) => {
        if (child instanceof Input) {
            const error = validator(child.props.validation, String(child.currentValue), getConfirmField(self, child));
            if (error) send = false;
            child.setProps({
                error,
            });
        }
    });
    if (send) {
        const sendData = self.getFormData();
        sendFunc(sendData);
    }
}
