import { Form } from '@components';
import { Block } from '@services';

import './auth.css';

interface Props {
  form: Form;
}

export class Auth extends Block<Props> {

  constructor(props: Props) {
    super('div', 'auth', props);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
