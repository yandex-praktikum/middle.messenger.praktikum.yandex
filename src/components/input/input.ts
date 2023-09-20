import {IProps,Block} from "../../utils/Block.ts";


interface IInputProps extends IProps {
    classes: string,
    placeholder: string,
    onBlur:()=>void,
    ref:string,
    name:string,
    value:string
    type: 'text' | 'password',
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
        const { classes, placeholder,ref,value,name,type } = this.props;
        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="${ref}"
                name="${name}"
                value="${value}"
                 type="${type}" 
            />
        `)
    }
}
