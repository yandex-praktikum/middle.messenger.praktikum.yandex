import Validator from "../core/Validator";

export const onFocus = (e: Event) => {
    // @ts-ignore
    const errEl = e.target.parentNode.querySelector(".form__error") as HTMLElement;
    errEl.textContent = "";
};

export const onBlur = (e: Event, type: string) => {
    // @ts-ignore
    const inputEl = e.target as HTMLInputElement;

    let errTxt = Validator.validateField(type, inputEl.value);

    // @ts-ignore
    const errEl = e.target.parentNode.querySelector(".form__error") as HTMLElement;
    // @ts-ignore
    errEl.textContent = errTxt;
};
