import { RegistrationPage } from './registration';
import { registrationButton } from '../../components/button/index';
import * as inputs from '../../components/input/index';
import { render } from '../../utils/render';
import { labelFocus } from '../../utils/labelFocus';
import { addEventSubmit } from '../../utils/events';
import './registration.sass';

const registrationPage = new RegistrationPage({
  emailInputModalForm: inputs.emailInputModalForm,
  loginInputModalForm: inputs.loginInputModalForm,
  firstNameInputModalForm: inputs.firstNameInputModalForm,
  secondNameInputModalForm: inputs.secondNameInputModalForm,
  phoneInputModalForm: inputs.phoneInputModalForm,
  passwordInputModalForm: inputs.passwordInputModalForm,
  passwordConfirmModalForm: inputs.passwordConfirmModalForm,
  registrationButton: registrationButton,
  settings: { withInternalID: true },
});

render('.root', registrationPage);
labelFocus('.holder__input', 'holder__span_hidden');
addEventSubmit('.modal__form');
