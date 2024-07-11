import s from './Title.module.scss'

export function Title({ text, size = 'md' }: { text: string, size?: 'md' | 'lg' }) {
    return (
        `
        <h2 class='${[s.text, s[`text__${size}`]].join(' ')}'>
            ${text}
        </h2>
        `
    );
}
