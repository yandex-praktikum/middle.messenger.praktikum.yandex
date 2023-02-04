import Block, { TProps } from '../../classes/Block';
import './button.scss';


export class Button extends Block {
    constructor(props: TProps) {
        super('button', props);
    }

    render() {
        if (typeof this.props.text === 'string') return this.props.text;
        return '';
    }
}


export default function button(props: TProps): string {
    const btn = new Button({
        text: props.label ?? '',
        attr: {
            class: props.className + ' btn',
        },
        events: {
            click: event => {
                console.log(event);
            },
        },
    });
    return btn.getContent()?.outerHTML;
}


// export default function button({
//     id = '',
//     className = '',
//     label = '',
//     onClick = (f) => f,
//     otherAttr = {},
// }: TButtonArg): string {
//     if (id) {
//         document.body.addEventListener('click', (e) => {
//             if (e.target?.id == id) onClick(e);
//         });
//     }
//     return templateButton({
//         ...otherAttr, id, className, label,
//     });
// }
