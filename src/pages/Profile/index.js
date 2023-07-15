import Handlebars from 'handlebars';
import { template } from './profile.tmpl.js';
import iconClose from '../../assets/icons/close.svg';
import Input from "../../components/Input/index.js";
import Button from "../../components/Button/index.js";
import InputAvatar from "../../components/InputAvatar/index.js";
import './profile.scss';

export const Profile = () => Handlebars.compile(template)({
    inputAvatar: `${InputAvatar({type: 'file', name: 'avatar'})}`,
    inputs: `
            ${Input({type: 'text', name: 'first_name', placeholder: 'Имя'})}
            ${Input({type: 'text', name: 'second_name', placeholder: 'Фамилия'})}
            ${Input({type: 'text', name: 'display_name', placeholder: 'Никнейм'})}
            ${Input({type: 'text', name: 'login', placeholder: 'Логин'})}
            ${Input({type: 'email', name: 'email', placeholder: 'E-mail'})}
            ${Input({type: 'tel', name: 'phone', placeholder: 'Телефон'})}
            ${Input({type: 'password', name: 'oldPassword', placeholder: 'Старый пароль'})}
            ${Input({type: 'password', name: 'newPassword', placeholder: 'Новый пароль'})}`,
    button: Button({label: 'Сохранить'}),
    buttonLogOut: Button({label: 'Выйти из профиля', species: 'red'}),
    iconClose
});

