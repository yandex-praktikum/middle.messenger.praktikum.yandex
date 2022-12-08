import { ProfilePage } from './profile';
import * as inputs from '../../components/input/index';
import * as buttons from '../../components/button/index';
import { render } from '../../utils/render';
import { addEventSubmit } from '../../utils/events';
import './profile.sass';

const profilePage = new ProfilePage({
  emailInput: inputs.emailInput,
  loginInput: inputs.loginInput,
  firstNameInput: inputs.firstNameInput,
  secondNameInput: inputs.secondNameInput,
  chatNameInput: inputs.chatNameInput,
  phoneInput: inputs.phoneInput,
  oldPasswordInput: inputs.oldPasswordInput,
  newPasswordInput: inputs.newPasswordInput,
  repeatPasswordInput: inputs.repeatPasswordInput,
  editInformationButton: buttons.editInformationButton,
  editPasswordButton: buttons.editPasswordButton,
  saveEditButton: buttons.saveEditButton,
  exitButton: buttons.exitButton,
  backButton: buttons.backButton,
  savePasswordButton: buttons.savePasswordButton,
});

render('.root', profilePage);
addEventSubmit('.profile__info-form');
addEventSubmit('.profile__change-password');

export { profilePage };
