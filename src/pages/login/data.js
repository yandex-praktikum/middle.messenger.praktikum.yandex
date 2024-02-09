import img from '../../images/chat.svg';

const loginData = {
  image: img,
  form: {
    title: 'Вход',
    id: 'login-form',
    fields: [
      {
        caption: 'Логин',
        type: 'text',
        id: 'login-input-login',
      },
      {
        caption: 'Пароль',
        type: 'password',
        id: 'login-input-password',
      },
    ],
    buttons: [
      {
        text: 'Авторизоваться',
        type: 'submit',
        id: 'login-btn',
        color: 'primary',
      }
    ],
    link: {
      text: 'Нет аккаунта?',
      url: '/pages/registration/registration.html',
    }
  },
}

export default loginData;