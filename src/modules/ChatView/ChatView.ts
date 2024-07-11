import s from './ChatView.module.scss'
import avatar from '../../../public/img/dialogAvatar.png'
import { ChatSubmit } from '../../components';

export function ChatView() {
    return (
        `
        <form class=${s.chat}>
            <div class=${s.chat__header}>
                <div class=${s.chat__info}>
                    <img src=${avatar} alt='Аватар' class=${s.chat__img} />
                    <p class=${s.chat__title}>Вадим</p>
                </div>
                <button class=${s.chat__button}>
                    <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                        <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                        <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                    </svg>
                </button>
            </div>
            <div class=${s.chat__content}>
                <span class=${s.chat__date}>19 июня</span>
                    <div class=${s.chat__content_left}>
                        <p class='${[s.chat__text, s.chat__text_left].join(' ')}'>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.<span class=${s.chat__text_time}>11:56</span>
                        </p>
                    </div>
                    <div class=${s.chat__content_right}>
                        <p class='${[s.chat__text, s.chat__text_right].join(' ')}'>Круто! <span class='${[s.chat__text_time, s.chat__text_check].join(' ')}'>12:00</span></p>
                    </div>
            </div>

            ${ChatSubmit()}
        </form>
        `
    );
}
