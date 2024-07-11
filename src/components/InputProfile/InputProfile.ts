import { ProfileDataType } from '../../types';
import s from './InputProfile.module.scss'

export function InputProfile(
    {
        title,
        type,
        value,
        isDisable = false,
        name,
        placeholder
    }: ProfileDataType) {

    return (
        `
        <div class=${s.wrapper}>
            <p class=${s.wrapper__title}>${title}</p>
            <input type=${type} id='${name}' placeholder='${placeholder}' ${isDisable && 'disabled=disabled'} name='${name}' value='${value ?? ''}' class=${s.wrapper__input} />
        </div>
        `
    );
}
