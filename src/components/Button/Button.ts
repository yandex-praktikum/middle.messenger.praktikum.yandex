import s from './Button.module.scss'

export function Button({ text }: { text: string }) {
    return (
        `
        <Button class=${s.button} >
            ${text}
        </Button>
        `
    );
}
