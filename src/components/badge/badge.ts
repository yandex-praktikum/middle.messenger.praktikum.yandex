import {IProps,Block} from "../../utils/Block";

interface IBadgeProps extends IProps{
    type: 'primary' | 'ready',
    text: string,
}

export class Badge extends Block {
    constructor(props: IBadgeProps) {
        super(props);
    }

    protected render(): string {
        const { type='', text=''} = this.props;
        return (`
            <div class="badge ${type?"badge-"+type:""}">
                <span>${text}</span>
            </div>
        `)
    }
}
