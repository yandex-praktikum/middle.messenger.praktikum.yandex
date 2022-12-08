import { Block, TProperties} from '../../utils/core/block';
import { profile } from './profile.tmpl';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

type TProfilePageProps = {
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  chatNameInput: Input;
  phoneInput: Input;
  oldPasswordInput: Input;
  newPasswordInput: Input;
  repeatPasswordInput: Input;
  editInformationButton: Button;
  editPasswordButton: Button;
  exitButton: Button;
  saveEditButton: Button;
  backButton: Button;
  savePasswordButton: Button;
  settings?: TProperties;
  events?: Record<string, (e: Event) => void>;
};

class ProfilePage extends Block<TProfilePageProps> {
  constructor(props: TProfilePageProps) {
    super(props);
  }
  render(): DocumentFragment {
    return this.compile(profile, this.props);
  }
}

export { ProfilePage, TProfilePageProps };
