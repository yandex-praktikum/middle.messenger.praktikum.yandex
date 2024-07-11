import s from './Link.module.scss'

export function Link({ text, href }: { text: string, href: string }) {
    return (
        `
        <a class=${s.link} href=${href}>${text}</a>
        `
    );
}
