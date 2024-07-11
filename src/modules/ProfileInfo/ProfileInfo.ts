import { Button, InputProfile } from '../../components';
import { ProfileData } from '../../constants';
import { ProfileDataType } from '../../types';
import avatar from '../../../public/img/dialogAvatar.png'
import s from './ProfileInfo.module.scss'

export function ProfileInfo({ isChange = false }: { isChange?: boolean }) {
    return (
        `
        <div class=${s.profile}>
            <div class=${s.profile__avatar}>
                <label>
                    <img src=${avatar} alt='Фотография' class=${s.profile__img} />
                    <input class=${s.profile__input} type='file' name='avatar'/>
                </label>
                <p class=${s.profile__title}>Иван</p>
            </div>
            <div class=${s.profile__list}>
                ${ProfileData.map((profile: ProfileDataType) => InputProfile({ ...profile, isDisable: !isChange })).join('')}
            </div>
            ${!isChange ? `
               <div class=${s.profile__links}>
                    <div class=${s.profile__block}>
                        <a class=${s.profile__link} href='/changeProfile'>Изменить данные</a>
                    </div>
                    <div class=${s.profile__block}>
                        <a class=${s.profile__link} href='/changePassword'>Изменить пароль</a>
                    </div>
                    <button name='exit' class=${s.profile__exit}>Выход</button>
                </div>
                `
            : `
                <div class=${s.profile__save}>
                    ${Button({ text: 'Сохранить' })}
                </div>
             `
        }
        </div>
        `
    );
}