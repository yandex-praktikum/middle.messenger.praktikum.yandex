import { Block, TProperties} from '../../utils/core/block';
import { registrationPage } from './registration.tmpl';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

type TRegistrationPageProps = {
  emailInputModalForm: Input;
  loginInputModalForm: Input;
  firstNameInputModalForm: Input;
  secondNameInputModalForm: Input;
  phoneInputModalForm: Input;
  passwordInputModalForm: Input;
  passwordConfirmModalForm: Input;
  registrationButton: Button;
  settings: TProperties;
};

class RegistrationPage extends Block<TRegistrationPageProps> {
  constructor(props: TRegistrationPageProps) {
    super(props);
  }
  render(): DocumentFragment {
    return this.compile(registrationPage, this.props);
  }
}

export { RegistrationPage, TRegistrationPageProps };
