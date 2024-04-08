export const LoginPageData = {
    formType: 'login_1',
    formHeaderTitle: 'Вход',
    formFooterTitle: 'У вас нет аккаунта?',
    formFooterLink: 'Регистрация',
    inputs: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            label: 'Логин',
            value: 'ivanivanov',
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            label: 'Пароль',
            value: 'asdfghjklp[=',
        },
    ],
    buttons: [{ text: 'Авторизоваться' }],
};
// type={{type}}
//         name={{name}}
//         placeholder={{placeholder}}
//         value={{value}}
