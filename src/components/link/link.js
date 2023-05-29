import templateLink from './link.hbs';
import './link.scss';


export default function link({
    id = '',
    className = '',
    label = '',
    href = '',
    onClick = f => f,
    otherAttr = {},
}) {
    if (id) {
        document.body.addEventListener('click', (e) => {
            if (e.target.id == id) onClick(e);
        });
    }
    return templateLink({ ...otherAttr, id, className, href, label });
}
