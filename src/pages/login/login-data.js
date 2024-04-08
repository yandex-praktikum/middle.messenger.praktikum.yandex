// export const LoginPageData = {
//     formType: 'login',
//     formHeaderTitle: 'Вход',
//     formFooterLink: 'Нет аккаунта?',

//     inputs: [
//         {
//             type: 'email',
//             name: 'email',
//             label: 'Логин',
//             placeholder: 'Логин',
//         },
//         {
//             type: 'password',
//             name: 'password',
//             label: 'Пароль',
//             placeholder: 'Пароль',
//         },
//     ],
//     buttons: [{ text: 'Авторизоваться' }],
// };

// export const LoginPageData = {
//     formType: 'login',
//     formHeaderTitle: 'Вход',
//     formFooterLink: 'Нет аккаунта?',

//     inputs: [
//         {
//             type: 'email',
//             name: 'email',
//             label: 'Логин',
//             placeholder: 'Логин',
//             value: 'ivanivanov',
//         },
//         {
//             type: 'password',
//             name: 'password',
//             label: 'Пароль',
//             placeholder: 'Пароль',
//             value: 'asdfghjklp[=',
//         },
//     ],
//     buttons: [{ text: 'Авторизоваться' }],
// };

// export const LoginPageData = {
//     formType: 'login',
//     formHeaderTitle: 'Вход',
//     formFooterLink: 'Нет аккаунта?',

//     inputs: [
//         {
//             type: 'email',
//             name: 'email',
//             label: 'Логин',
//             placeholder: 'Логин',
//             value: 'ivanivanov',
//             errorName: 'Неверный логин',
//         },
//         {
//             type: 'password',
//             name: 'password',
//             label: 'Пароль',
//             placeholder: 'Пароль',
//         },
//     ],
//     buttons: [{ text: 'Авторизоваться' }],
// };

// export const LoginPageData = {
//     formType: 'login',
//     formHeaderTitle: 'Вход',
//     formFooterLink: 'Нет аккаунта?',

//     inputs: [
//         {
//             type: 'email',
//             name: 'email',
//             label: 'Логин',
//             placeholder: 'Логин',
//             value: 'ivanivanov',
//             errorName: 'Неверный логин',
//         },
//         {
//             type: 'password',
//             name: 'password',
//             label: 'Пароль',
//             placeholder: 'Пароль',
//             value: 'asddssadsadsd',
//         },
//     ],
//     buttons: [{ text: 'Авторизоваться' }],
// };

export const LoginPageData = {
    formType: 'registration',
    formHeaderTitle: 'Регистрация',

    inputs: [
        {
            type: 'email',
            name: 'email',
            label: 'Почта',
            placeholder: 'Почта',
            value: 'pochta@yandex.ru',
        },
        {
            type: 'login',
            name: 'email',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
        },
        {
            type: 'first_name',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
        },
        {
            type: 'second_name',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
        },
        {
            type: 'password',
            name: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            value: 'asddssadsadsd',
        },
        {
            type: 'password',
            name: 'password',
            label: 'Пароль (ещё раз)',
            placeholder: 'Пароль (ещё раз)',
            value: 'asddssadsadsd',
            errorName: 'Пароли не совпадают',
        },
    ],
    buttons: [{ text: 'Зарегистрироваться' }],
    formFooterLink: 'Войти',
};
