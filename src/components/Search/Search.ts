import s from './Search.module.scss'

export function Search() {
    return (
        `
        <label class=${s.label}>
            <input type='text' placeholder='Поиск' class=${s.label__input} />
            <span class=${s.label__icon}></span>
        </label>
        `
    );
}
