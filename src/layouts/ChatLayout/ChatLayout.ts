import { ChatMenu } from '../../modules';
import s from './ChatLayout.module.scss'

export function ChatLayout(children: string) {
    return (
        `
        <div class=${s.layout}>
            <div class=${s.layout__menu}>
                ${ChatMenu()}
            </div>
            <div class=${s.layout__content}>
                ${children}
            </div>
        </div>
        `
    );
}
