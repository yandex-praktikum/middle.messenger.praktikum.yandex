import { Block, FormValidator } from "../../core";

interface EntryProps {
    title: string;
    name: string;
    type: string;
}

class EntryItem extends Block {
    static componentName = "EntryItem";

    constructor(props: EntryProps) {
        super(props);

        this.setProps({
            props,
            onFocus: (e: Event) => this.inputFocus(e),
            onBlur: (e: Event) => this.validateField(e),
        })
    }

    inputFocus(e: Event) {
        // const errorMsg = (this.element as HTMLElement).querySelector(".entry__error") as HTMLElement;

        // errorMsg.textContent = "";
        (e.target as HTMLInputElement).removeAttribute("data-is-valid");
    }

    validateField(e: Event) {        
        const field = document.querySelector(`[name=${(e.target as HTMLInputElement).name}]`) as HTMLInputElement;
        new FormValidator(this.element as HTMLElement).checkField(field);
    }

    protected render() {
        return `
            <li class="entry__item">
                {{{ Input type=type name=name title=title onFocus=onFocus onBlur=onBlur }}}
                <label class="entry__label">{{ title }}</label>
                <span class="entry__error"></span>
            </li>
        `;
    }
}

export default EntryItem;
