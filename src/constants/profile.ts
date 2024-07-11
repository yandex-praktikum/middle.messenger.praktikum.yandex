import { ProfileDataType } from "../types";

export const ProfileData: ProfileDataType[] = [
    {
        title: 'Почта',
        type: 'email',
        value: 'pochta@yandex.ru',
        name: 'email',
        placeholder: 'email',
    },
    {
        title: 'Логин',
        type: 'text',
        value: 'ivanivanov',
        name: 'login',
        placeholder: 'Логин',
    },
    {
        title: 'Имя',
        type: 'text',
        value: 'Иван',
        name: 'first_name',
        placeholder: 'Имя',
    },
    {
        title: 'Фамилия',
        type: 'text',
        value: 'Иванов',
        name: 'second_name',
        placeholder: 'Фамилия',
    },
    {
        title: 'Имя в чате',
        type: 'text',
        value: 'Иван',
        name: 'display_name',
        placeholder: 'Имя в чате',
    },
    {
        title: 'Телефон',
        type: 'tel',
        value: '+7 (909) 967 30 30',
        name: 'phone',
        placeholder: 'Телефон',
    }
]
