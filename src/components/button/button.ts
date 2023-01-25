import templateButton from './button.hbs';
import './button.scss';

type TButtonArg = {
    id?: string,
    className?: string,
    label?: string,
    onClick?: (f: any) => void,
    otherAttr?: {}
}

export default function button({
    id = '',
    className = '',
    label = '',
    onClick = f => f,
    otherAttr = {},
}: TButtonArg) {
    if (id) {
        document.body.addEventListener('click', (e) => {
            if (e.target?.id == id) onClick(e);
        });
    }
    return templateButton({ ...otherAttr, id, className, label });
}
