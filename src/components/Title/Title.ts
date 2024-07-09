import s from './Title.module.scss'

export function Title({ text }: { text: string }) {
    return (
        `
        <h2 class=${s.text}>
            ${text}
        </h2>
        `
    );
}