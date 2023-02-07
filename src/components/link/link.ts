import Block, { TProps } from '../../classes/Block';
import './link.scss';


export default class Link extends Block {
    constructor(props: TProps) {
        super('a', props);
    }

    render() {
        if (typeof this.props.text === 'string') return this.props.text;
        return '';
    }
}


// export default function link(props: TProps): string {
//     const btn = new Link({
//         text: props.label ?? '',
//         attr: {
//             class: `${props.className} link`,
//             href: `${props.href}`,
//         },
//     });
//     return btn.getContent()?.outerHTML;
// }
