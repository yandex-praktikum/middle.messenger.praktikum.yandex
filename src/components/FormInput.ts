import Block from "../core/Block";

type Props = {
    type: string,
    name: string,
    title: string,
    value?: string,
    disabled?: string,
    events: {
        focus: (e: Event) => void,
        blur: (e: Event) => void,
    },
};

class FormInput extends Block {
    constructor(props: Props) {
        super({ ...props, });
    };

    render() {
        return this.compile(`
            <input class="form-input" name={{name}} type={{type}} placeholder={{title}} {{disabled}} value={{value}}>
        `, { ...this.props });
    };
};

export default FormInput;
