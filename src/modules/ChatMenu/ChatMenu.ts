import { Dialog, Search } from '../../components';
import { Dialogs } from '../../constants';
import s from './ChatMenu.module.scss'

export function ChatMenu() {
    return (
        `
        <nav class=${s.menu}>
            <div class=${s.menu__header}>
                <a href='/profile' class=${s.menu__link}>Профиль</a>
                ${Search()}
            </div>
            <ul class=${s.menu__list}>
                ${Dialogs.map(dialog => `<li class=${s.menu__li}>${Dialog({ ...dialog })}</li>`).join('')}
            </ul>
        </nav>
            `
    );
}
