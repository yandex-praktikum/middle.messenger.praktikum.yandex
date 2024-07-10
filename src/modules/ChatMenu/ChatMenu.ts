import { Dialog, Search } from '../../components';
import { Dialogs } from '../../constants';
import s from './ChatMenu.module.scss'

export function ChatMenu() {
    return (
        `
        <div class=${s.menu}>
            <div class=${s.menu__header}>
                <a href='/profile' class=${s.menu__link}>Профиль</a>
                ${Search()}
            </div>
            <div class=${s.menu__list}>
                ${Dialogs.map(dialog => Dialog({ ...dialog })).join('')}
            </div>
        </div>
            `
    );
}
