import s from './Input.module.scss'

export function Input({ title, type, name, isError }: { title: string, type: 'text' | 'password' | 'tel' | 'email', name: string, isError?: boolean }) {

    function error() {
        if (!isError) {
            return ''
        } else {
            return `<span class=${s.label__error}>Неверный ${title.toLowerCase()}</span>`
        }
    }

    return (
        `
        <label class=${s.label}>
            ${error()}
            <input class=${s.label__input} type=${type} placeholder=${title} name=${name} />
            <span class=${s.label__span}>${title}</span>
        </label>
        `
    );
}
