import { Block, TProperties} from '../../utils/core/block';
import { authorizationPage } from './authorization.tmpl';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

type TAuthorizationPageProps = {
  loginInputModalForm: Input;
  passwordInputModalForm: Input;
  authorizationButton: Button;
  settings?: TProperties;
};

class AuthorizationPage extends Block<TAuthorizationPageProps> {
  constructor(props: TAuthorizationPageProps) {
    super(props);
  }
  render(): DocumentFragment {
    return this.compile(authorizationPage, this.props);
  }
}

export { AuthorizationPage, TAuthorizationPageProps };
