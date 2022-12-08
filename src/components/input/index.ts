import { filteredNumber, validateInput } from '../../utils/validationForm';
import { Input } from './input';

const VALIDATION_EVENTS = {
  blur: validateInput,
  focus: validateInput
};

const emailInputModalForm = new Input({
  idInput: 'email',
  nameInput: 'email',
  placeHolder: 'Почта',
  typeInput: 'email',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const loginInputModalForm = new Input({
  idInput: 'login',
  nameInput: 'login',
  placeHolder: 'Логин',
  typeInput: 'text',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const firstNameInputModalForm = new Input({
  idInput: 'first_name',
  nameInput: 'first_name',
  placeHolder: 'Имя',
  typeInput: 'text',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const secondNameInputModalForm = new Input({
  idInput: 'second_name',
  nameInput: 'second_name',
  placeHolder: 'Фамилия',
  typeInput: 'text',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const phoneInputModalForm = new Input({
  idInput: 'phone',
  nameInput: 'phone',
  placeHolder: 'Телефон',
  typeInput: 'text',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: {input: (e) => filteredNumber(e), ...VALIDATION_EVENTS}
});

const passwordInputModalForm = new Input({
  idInput: 'password',
  nameInput: 'password',
  placeHolder: 'Пароль',
  typeInput: 'password',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const passwordConfirmModalForm = new Input({
  idInput: 'password-confirm',
  nameInput: 'password-confirm',
  placeHolder: 'Подтверждение пароля',
  typeInput: 'password',
  classInput: 'holder__input',
  settings: { withInternalID: true },
  events: VALIDATION_EVENTS,
});

const emailInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'email',
  valueInput: 'pochta@yandex.ru',
  classInput: 'profile__info-value',
  readonly: true,
  events: VALIDATION_EVENTS,
});

const loginInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'login',
  valueInput: 'ivanivanov',
  classInput: 'profile__info-value',
  readonly: true,
  events: VALIDATION_EVENTS,
});

const firstNameInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'first_name',
  valueInput: 'Иван',
  classInput: 'profile__info-value',
  readonly: true,
  events: VALIDATION_EVENTS,
});

const secondNameInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'second_name',
  valueInput: 'Иванов',
  classInput: 'profile__info-value',
  readonly: true,
  events: VALIDATION_EVENTS,
});

const chatNameInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'display_name',
  valueInput: 'ivan',
  classInput: 'profile__info-value',
  readonly: true,
  events: VALIDATION_EVENTS,
});

const phoneInput = new Input({
  idInput: '',
  typeInput: 'text',
  nameInput: 'phone',
  valueInput: '+79099673030',
  classInput: 'profile__info-value',
  readonly: true,
  events: {input: (e) => filteredNumber(e), ...VALIDATION_EVENTS}
});

const oldPasswordInput = new Input({
  idInput: '',
  typeInput: 'password',
  nameInput: 'oldPassword',
  valueInput: '••••••••',
  classInput: 'profile__info-value',
  events: VALIDATION_EVENTS,
});

const newPasswordInput = new Input({
  idInput: '',
  typeInput: 'password',
  nameInput: 'newPassword',
  valueInput: '••••••••••',
  classInput: 'profile__info-value',
  events: VALIDATION_EVENTS,
});

const repeatPasswordInput = new Input({
  idInput: '',
  typeInput: 'password',
  nameInput: 'repeat_password',
  valueInput: '••••••••••',
  classInput: 'profile__info-value',
  events: VALIDATION_EVENTS,
});

const textArea = new Input({
  typeInput: 'messagearea',
  classInput: 'form__messagearea',
  nameInput: 'message',
  idInput: 'message',
  placeHolder: 'Сообщение',
  autocomplete: 'off',
  events: VALIDATION_EVENTS,
});

export {
  emailInputModalForm,
  loginInputModalForm,
  firstNameInputModalForm,
  secondNameInputModalForm,
  phoneInputModalForm,
  passwordInputModalForm,
  passwordConfirmModalForm,
  emailInput,
  loginInput,
  firstNameInput,
  secondNameInput,
  chatNameInput,
  phoneInput,
  oldPasswordInput,
  newPasswordInput,
  repeatPasswordInput,
  textArea
};
