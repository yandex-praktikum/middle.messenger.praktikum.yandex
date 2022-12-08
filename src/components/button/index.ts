import { Button } from './button';
import { popup } from '../../utils/popup';

const CHANGE_PASSWORD = "change-password";

const changePassword = (): void => {
  const wrapper = document.querySelector(".profile");
  wrapper?.classList.add(CHANGE_PASSWORD);
};

const registrationButton = new Button({
  id:'',
  type: 'button',
  class: 'big-button  reg__buttons-reg',
  text: 'Зарегистрироваться',
  settings: { withInternalID: true },
});

const authorizationButton = new Button({
  id:'',
  type: 'button',
  class: 'big-button  login__buttons-login',
  text: 'Войти',
  settings: { withInternalID: true },
});

const dropDownButton = new Button({
  id:'',
  type: 'button',
  class: 'chat-title__utils-btn',
  text: "<img src='../../../static/images/drop-down.svg' alt='Drop down'>",
  events: {click: popup},
  settings: { withInternalID: true },
});

const attachButton = new Button({
  id: 'attach',
  type: 'button',
  class: 'button__attach',
  text: "<img src='../../../static/images/attach.svg' alt='Attach'>",
  events: {click: popup},
  settings: { withInternalID: true },
});

const sendButton = new Button({
  id: 'btn-msg-submit',
  type: 'submit',
  class: 'form-msg__btn-send',
  text: "<img src='../../../static/images/send-message.svg' alt='Send'>",
  settings: { withInternalID: true },
});

const editInformationButton = new Button({
  id: 'profile-edit-info',
  type: 'button',
  class: 'profile__btn',
  text: 'Изменить данные',
  settings: { withInternalID: true },
});

const editPasswordButton = new Button({
  id: 'profile-edit-password',
  type: 'button',
  class: 'profile__btn',
  text: 'Изменить пароль',
  settings: { withInternalID: true },
  events: {click: changePassword},
});

const saveEditButton = new Button({
  id: 'profile-edit-save',
  type: 'submit',
  class: 'profile__btn profile__btn_save',
  text: 'Сохранить',
  settings: { withInternalID: true },
});

const savePasswordButton = new Button({
  id: 'profile-change-password-save',
  type: 'submit',
  class: 'profile__btn profile__btn_save',
  text: 'Сохранить',
  settings: { withInternalID: true },
});

const backButton = new Button({
  id:'',
  type: 'button',
  class: 'back__img',
  text: "<img src='../../../static/images/back-arrow.svg' alt='Drop down'>",
  href: '',
  settings: { withInternalID: true },
});

const exitButton = new Button({
  id: 'profile-unlogin',
  type: 'button',
  class: 'profile__btn profile__btn_red',
  text: 'Выйти',
  href: '../authorization/authorization.html',
  settings: { withInternalID: true },
});

export {
  registrationButton,
  authorizationButton,
  dropDownButton,
  attachButton,
  sendButton,
  editInformationButton,
  editPasswordButton,
  saveEditButton,
  savePasswordButton,
  backButton,
  exitButton,
};
