export const ProfilePageData = {
    formType: 'profile',
    profileTitle: 'Иван',

    profileItems: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Почта',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            readonly: 'readonly',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
            readonly: 'readonly',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            readonly: 'readonly',
        },
    ],

    profileActions: [
        { profileActionsName: 'Изменить данные' },
        { profileActionsName: 'Изменить пароль' },
        { profileActionsName: 'Выйти' },
    ],
};

export const ProfilePageChangesData = {
    formType: 'profileChangesData',
    profileItems: [
        {
            type: 'email',
            name: 'email',
            label: 'Почта',
            placeholder: 'Почта',
            value: 'pochta@yandex.ru',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
        },
        {
            type: 'text',
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
    ],

    profileButtons: [{ text: 'Сохранить' }],
};

export const ProfilePageChangesPassword = {
    formType: 'profileChangesPassword',
    profileItems: [
        {
            type: 'password',
            name: 'oldPassword',
            label: 'Старый пароль',
            placeholder: 'Старый пароль',
            value: 'asfdsdfgwef',
        },
        {
            type: 'password',
            name: 'newPassword',
            label: 'Новый пароль',
            placeholder: 'Новый пароль',
            value: 'asfdsdfgwefasd221319!',
        },
        {
            type: 'password',
            name: 'repeatNewPassword',
            label: 'Повторите новый пароль',
            placeholder: 'Повторите новый пароль',
            value: 'asfdsdfgwefasd221319!',
        },
    ],

    profileButtons: [{ text: 'Сохранить' }],
};

export const ProfileModalFileToLoad = {
    formType: 'profile',
    profileTitle: 'Иван',

    profileItems: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Почта',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            readonly: 'readonly',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
            readonly: 'readonly',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            readonly: 'readonly',
        },
    ],

    profileActions: [
        { profileActionsName: 'Изменить данные' },
        { profileActionsName: 'Изменить пароль' },
        { profileActionsName: 'Выйти' },
    ],

    modalTitle: 'Загрузите файл',
    label: 'Выбрать файл на компьютере',
    type: 'file',
    name: 'avatar',
};

export const ProfileModalFileLoaded = {
    formType: 'profile',
    profileTitle: 'Иван',

    profileItems: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Почта',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            readonly: 'readonly',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
            readonly: 'readonly',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            readonly: 'readonly',
        },
    ],

    profileActions: [
        { profileActionsName: 'Изменить данные' },
        { profileActionsName: 'Изменить пароль' },
        { profileActionsName: 'Выйти' },
    ],

    modalTitle: 'Файл загружен',
    inputText: 'pic.jpg',
    type: 'file',
    name: 'avatar',
};

export const ProfileModalFileErrorLoad = {
    formType: 'profile',
    profileTitle: 'Иван',

    profileItems: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Почта',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            readonly: 'readonly',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
            readonly: 'readonly',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            readonly: 'readonly',
        },
    ],

    profileActions: [
        { profileActionsName: 'Изменить данные' },
        { profileActionsName: 'Изменить пароль' },
        { profileActionsName: 'Выйти' },
    ],

    modalTitle: 'Загрузите файл',
    errorModalName: 'Нужно выбрать файл',
    type: 'file',
    name: 'avatar',
    label: 'Выбрать файл на компьютере',
};

export const ProfileModalFileError = {
    formType: 'profile',
    profileTitle: 'Иван',

    profileItems: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Почта',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            readonly: 'readonly',
        },
        {
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'ivanivanov',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Иван',
            readonly: 'readonly',
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Иванов',
            readonly: 'readonly',
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            readonly: 'readonly',
        },
    ],

    profileActions: [
        { profileActionsName: 'Изменить данные' },
        { profileActionsName: 'Изменить пароль' },
        { profileActionsName: 'Выйти' },
    ],

    modalTitle: 'Ошибка, попробуйте ещё раз',
    errorTitle: 'error',
    type: 'file',
    name: 'avatar',
    label: 'Выбрать файл на компьютере',
};
