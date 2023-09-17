import Block from "../../utils/Block.ts";


interface IInputProps {
    classes: string,
    placeholder: string,
    onBlur:()=>void,
    ref:string,
    value:string
}

export class Input extends Block {
    constructor(props: IInputProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {})
            }
        })
    }

    protected render(): string {
        const { classes, placeholder,ref,value } = this.props;
        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="${ref}"
                value="${value}"
            />
        `)
    }
}
