import dialogAvatar from '../../../public/img/dialogAvatar.png'
import s from './Dialog.module.scss'

export function Dialog({
    name,
    lastMessage,
    time,
    countMessage,
    avatar = dialogAvatar,
    yourMessage = false
}:
    {
        name: string,
        lastMessage: string,
        time: string,
        countMessage?: number,
        avatar?: string,
        yourMessage?: boolean
    }) {

    return (
        `
        <div class=${s.dialog}>
           <img src=${avatar} class=${s.dialog__img} alt="аватар пользователя">
           <div class=${s.dialog__grid}>
                <h2 class=${s.dialog__name}>${name}</h2>
                <p class=${s.dialog__text}>
                    <span class='${[s.dialog__text, s.dialog__text_bold].join(' ')}'>
                        ${yourMessage ? 'Вы: ' : ''}
                    </span> 
                    <span class=${s.dialog__text_line}>
                        ${lastMessage}
                    </span>
                </p>
                <span class=${s.dialog__time}>${time}</span>
                ${countMessage ? `<div class=${s.dialog__count}>
                    <span class=${s.dialog__count_text}>${countMessage}</span>
                </div>`: ''}
           </div>
        </div>
        `
    );
}
