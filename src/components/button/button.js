import templateButton from './button.hbs';
import './button.scss';


export default function button({
    id = '',
    className = '',
    label = '',
    href = '',
    onClick = f => f,
    otherAttr = {},
})  {
    if (id) {
        document.body.addEventListener('click', (e) => {
            if (e.target.id == id) onClick(e);
        });
    }
    return templateButton({ ...otherAttr, id, className, label });
}
