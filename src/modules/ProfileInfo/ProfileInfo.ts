import { Button, InputProfile } from '../../components';
import { ProfileData } from '../../constants';
import { ProfileDataType } from '../../types';
import avatar from '../../../public/img/dialogAvatar.png'
import s from './ProfileInfo.module.scss'

export function ProfileInfo({ isChange = false }: { isChange?: boolean }) {
    return (
        `
        <form class=${s.profile}>
            <div class=${s.profile__avatar}>
                <label>
                    <img src=${avatar} alt='Фотография' class=${s.profile__img} />
                    <input class=${s.profile__input} type='file' name='avatar'/>
                </label>
                <p class=${s.profile__title}>Иван</p>
            </div>
            <ul class=${s.profile__list}>
                    ${ProfileData.map((profile: ProfileDataType) => `<li class=${s.profile__li}>${InputProfile({ ...profile, isDisable: !isChange })}</li>`).join('')}
            </ul>
            ${!isChange ? `
               <ul class=${s.profile__links}>
                    <li class=${s.profile__block}>
                        <a class=${s.profile__link} href='/changeProfile'>Изменить данные</a>
                    </li>
                    <li class=${s.profile__block}>
                        <a class=${s.profile__link} href='/changePassword'>Изменить пароль</a>
                    </li>
                    <li class=${s.profile__block}>
                        <button name='exit' class=${s.profile__exit}>Выход</button>
                    </li>
                </ul>
                `
            : `
                <div class=${s.profile__save}>
                    ${Button({ text: 'Сохранить' })}
                </div>
             `
        }
        </form>
        `
    );
}
