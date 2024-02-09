import img from '../../images/registration.svg';

const registrationData = {
  image: img,
  form: {
    title: 'Регистрация',
    id: 'registration-form',
    fields: [
      {
        caption: 'Почта',
        type: 'email',
        id: 'registration-input-mail',
      },
      {
        caption: 'Логин',
        type: 'text',
        id: 'registration-input-login',
      },
      {
        caption: 'Имя',
        type: 'text',
        id: 'registration-input-firstName',
      },
      {
        caption: 'Фамилия',
        type: 'text',
        id: 'registration-input-secondName',
      },
      {
        caption: 'Телефон',
        type: 'tel',
        id: 'registration-input-phone',
      },
      {
        caption: 'Пароль',
        type: 'password',
        id: 'registration-input-password',
      },
      {
        caption: 'Повторите пароль',
        type: 'password',
        id: 'registration-input-password-repeat',
      },
    ],
    buttons: [
      {
        text: 'Зарегистрироваться',
        type: 'submit',
        id: 'registration-btn',
        color: 'primary',
      }
    ],
    link: {
      text: 'Уже есть аккаунт?',
      url: '/pages/login/login.html',
    }
  },
}

export default registrationData;