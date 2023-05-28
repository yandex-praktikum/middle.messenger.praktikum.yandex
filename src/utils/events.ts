import Validator from "../core/Validator";

export const onFocus = (e: Event) => {
    const errParent = (e.target as HTMLElement).parentNode as HTMLElement
    const errEl = errParent.querySelector(".form__error") as HTMLElement;
    errEl.textContent = "";
};

export const onBlur = (e: Event, type: string) => {
    const inputEl = e.target as HTMLInputElement;

    let errTxt = Validator.validateField(type, inputEl.value);

    const errParent = (e.target as HTMLElement).parentNode as HTMLElement
    const errEl = errParent.querySelector(".form__error") as HTMLElement;
    errEl.textContent = errTxt as string;
};
