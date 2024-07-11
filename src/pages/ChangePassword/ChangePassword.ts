import { ProfileLayout } from "../../layouts";
import avatar from '../../../public/img/dialogAvatar.png'
import s from './ChangePassword.module.scss'
import { Button, InputProfile } from "../../components";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ChangePassword()

export function ChangePassword() {
    return (
        `
        ${ProfileLayout(
            `
            <div class=${s.wrapper}>
                <div class=${s.wrapper__info}>
                    <div class=${s.wrapper__avatar}>
                        <img src=${avatar} alt='Фотография' class=${s.wrapper__img} />
                    </div>
                    <div class=${s.wrapper__list}>
                        ${InputProfile({ title: 'Старый пароль', type: 'password', name: 'oldPassword', placeholder: 'Старый пароль' })}
                        ${InputProfile({ title: 'Новый пароль', type: 'password', name: 'newPassword', placeholder: 'Новый пароль' })}
                        ${InputProfile({ title: 'Повторите новый пароль', type: 'password', name: 'newPassword', placeholder: 'Повторите новый пароль' })}
                    </div>
                </div>
                <div class=${s.wrapper__button}>
                    ${Button({ text: 'Сохранить' })}
                </div>
            </div>
            `
        )}
        `
    );
}