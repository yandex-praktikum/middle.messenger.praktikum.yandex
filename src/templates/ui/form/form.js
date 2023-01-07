import templateForm from './form.hbs';
import './form.scss';


export default function form({
    attr = {},
    formTitle = 'title',
    formItems = [],
    formButtons = [],
    submit = f => f,
}) {

    console.log(formTitle);

    // if (attr.id) {
    //     document.body.addEventListener('submit', (e) => {
    //         // console.log();
    //         if (e.target.id == attr.id) onClick(e);
    //     });
    // }
    return templateForm(
        {
            ...attr, formTitle, formItems: formItems.join(''), formButtons:formButtons.join('')
        }
    );
}
