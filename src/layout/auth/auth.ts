import { Form } from '@components';
import { Block } from '@services';

import AuthTemplate from './auth.hbs';
import './auth.css';

interface Props {
  title: string;
  form: Form;
}

export class Auth extends Block<Props> {

  constructor(props: Props) {
    super('div', 'auth', props);
  }

  render(): DocumentFragment {
    return this.compile(AuthTemplate, { title: this.props.title });
  }
}
