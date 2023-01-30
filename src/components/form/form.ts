import templateForm from './form.hbs';
import './form.scss';

type TFormArg = {
    formTitle?: string,
    formItems?: Array<string | undefined>,
    formButtons?: Array<string | undefined>,
    label?: string,
    submit?: (f: any) => void,
    attr?: {}
}

export default function form({
    attr = {},
    formTitle = 'title',
    formItems = [],
    formButtons = [],
    submit = (f) => f,
}: TFormArg):string {
    return templateForm(
        {
            ...attr, formTitle, formItems: formItems.join(''), formButtons: formButtons.join(''),
        },
    );
}
