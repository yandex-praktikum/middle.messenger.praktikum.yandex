import templateInput from './input.hbs';
import './input.scss';


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
    onChange = f => f,
    onOninput = f => f,
    otherAttr = {},
    errorMessage = ''
}) {

    const labelVisible = (e) => {
        const label = e.target.previousElementSibling;
        if (!label.classList.contains('textLabel')) return;
        if (!e.target.value) label.classList.remove('visible');
        else label.classList.add('visible');
    }


    const errorMsqPush = (msq) => {
        // console.log(123);
        if (!id) return;
        // const errorBlock = e.target.parentNode;
    }

    if (id) {
        document.body.addEventListener('change', (e) => {
            if (e.target.id == id) {
                // onChange(e);
            }
        });
        document.body.addEventListener('input', (e) => {
            if (e.target.id == id) {
                // onOninput(e);
                // labelVisible(e);
            }
        });
    }




    return templateInput({
        ...otherAttr, labelId,
        labelClass,
        textLabel,
        id,
        className,
        name,
        type,
        placeholder,
        errorMessage,
        defaultValue,
        test
    });
}





function test(element) {
    console.log(element);
}

window.chatApp = {
    test
};
