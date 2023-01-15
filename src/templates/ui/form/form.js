import templateForm from './form.hbs';
import './form.scss';


export default function form({
    attr = {},
    formTitle = 'title',
    formItems = [],
    formButtons = [],
    submit = f => f,
})  {


    return templateForm(
        {
            ...attr, formTitle, formItems: formItems.join(''), formButtons: formButtons.join('')
        }
    );
}
