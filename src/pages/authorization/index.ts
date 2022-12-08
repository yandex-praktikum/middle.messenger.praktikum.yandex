import { AuthorizationPage } from './authorization';
import { authorizationButton } from '../../components/button/index';
import * as inputs from '../../components/input/index';
import { render } from '../../utils/render';
import { labelFocus } from '../../utils/labelFocus';
import { addEventSubmit } from '../../utils/events';
import './authorization.sass';

const authorizationPage = new AuthorizationPage({
  
  loginInputModalForm: inputs.loginInputModalForm,
  passwordInputModalForm: inputs.passwordInputModalForm,
  authorizationButton: authorizationButton,
  settings: { withInternalID: true },
});

render('.root', authorizationPage);
labelFocus('.holder__input', 'holder__span_hidden');
addEventSubmit('.modal__form');
