const profileInputs = [
    {label: 'Почта', name: 'email', type: 'text', value: 'pochta@yandex.ru'},
    {label: 'Логин', name: 'login', type: 'text', value: 'ivanIvanov'},
    {label: 'Имя', name: 'first_name', type: 'text', value: 'Иван'},
    {label: 'Фамилия', name: 'second_name', type: 'text', value: 'Иванов'},
    {label: 'Имя в чате', name: 'display_name', type: 'text', value: 'Иван'},
    {label: 'Телефон', name: 'phone', type: 'text', value: '89099999999'},
]

const passwordInputs = [
    {label: 'Старый пароль', type: 'password', name: 'oldPassword', value: 'lorem'},
    {label: 'Новый пароль', type: 'password', name: 'newPassword', value: 'lorem'},
    {label: 'Повторите новый пароль', type: 'password', name: 'newPassword', value: 'lorem'},
]

export const profileData = {
    base: {
        title: 'Profile',
        profileInputs,
        links: [
            {text: 'Изменить данные', href: '#', class: 'profile-link'},
            {text: 'Изменить пароль', href: '#', class: 'profile-link'},
            {text: 'Выйти', href: '#', class: 'profile-link profile-link_assertive'},
        ]
    },
    changeInfo: {title: 'Profile Change', profileInputs},
    changePassword: {title: 'Password Change', passwordInputs}
}
