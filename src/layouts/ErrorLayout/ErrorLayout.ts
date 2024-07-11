import { Link, Title } from '../../components';
import s from './ErrorLayout.module.scss'

export function ErrorLayout({ title, text }: { title: string, text: string }) {
    return (
        `
        <div class=${s.layout}>
            <div class=${s.layout__info}>
                ${Title({ text: title, size: 'lg' })}
                ${Title({ text: text })}
            </div>
            ${Link({ text: 'Назад к чатам', href: '/' })}
        </div>
        `
    );
}
