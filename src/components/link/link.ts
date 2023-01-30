import templateLink from './link.hbs';
import './link.scss';

type TlinkObj = {
    id?: string,
    className?: string,
    label?: string,
    href?: string,
    onClick?: (f: any) => void,
    otherAttr?: {}
}

export default function link({
    id = '',
    className = '',
    label = '',
    href = '',
    onClick = (f: void): void => f,
    otherAttr = {},
}: TlinkObj): string {
    if (id) {
        document.body.addEventListener('click', (e: Event) => {
            if (e.target?.id == id) onClick(e);
        });
    }
    return templateLink({
        ...otherAttr, id, className, href, label,
    });
}
