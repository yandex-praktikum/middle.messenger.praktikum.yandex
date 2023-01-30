import templateInput from './input.hbs';
import './input.scss';

type TFormArg = {
    labelId?: string,
    labelClass?: string,
    textLabel?: string,
    id?: string,
    className?: string,
    name?: string,
    defaultValue?: string,
    type?: string,
    placeholder?: string,
    onChange?: (f: any) => void,
    onOninput?: (f: Event) => void,
    errorMessage?: string,
    otherAttr?: {}
}


export default function input({
    labelId = '',
    labelClass = '',
    textLabel = '',
    id = '',
    className = '',
    name = '',
    defaultValue = '',
    type = '',
    placeholder = '',
    onChange = (f) => f,
    onOninput = (f) => f,
    otherAttr = {},
    errorMessage = '',
}: TFormArg):string {
    const labelVisible = (e: Event) => {
        const label = e?.target?.previousElementSibling;
        if (!label.classList.contains('textLabel')) return;
        if (!e?.target?.value) label.classList.remove('visible');
        else label.classList.add('visible');
    };


    // const errorMsqPush = (msq) => {
    //     if (!id) return;
    // }

    if (id) {
        document.body.addEventListener('change', (e) => {
            if (e?.target?.id == id) {
                // onChange(e);
            }
        });
        document.body.addEventListener('input', (e) => {
            if (e?.target?.id == id) {
                onOninput(e);
                labelVisible(e);
            }
        });
    }


    return templateInput({
        ...otherAttr,
        labelId,
        labelClass,
        textLabel,
        id,
        className,
        name,
        type,
        placeholder,
        errorMessage,
        defaultValue,
    });
}
