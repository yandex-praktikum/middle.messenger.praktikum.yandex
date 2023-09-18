import Block from "../../utils/Block";

interface IButtonProps {
    type: 'arrow' | 'dots'|'paperclip'|'cancel'|'number',
    caption: string,
    page: string,
    onClick: () => void
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick || (() => {})
            }
        })
    }

    protected render(): string {
        const { type='', caption='', page='' } = this.props;
        return (`
            <button class="button ${type?"button-"+type:""}" 
            ${page ? `page="${page}"` : ''}> 
                ${caption}
            </button>
        `)
    }
}
