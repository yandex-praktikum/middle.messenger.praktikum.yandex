import { Block } from '@services';

import ErrorTemplate from './error.hbs';
import './error.css';

interface Props {
  status: string | number;
}

export class ErrorPage extends Block<Props> {

  constructor(props: Props) {
    super('div', 'error', props);
  }

  render(): DocumentFragment {
    const text = this.props.status === 404
      ? 'Данной страницы не существует'
      : 'Мы уже фиксим проблему...';
    return this.compile(ErrorTemplate, { status: this.props.status, text });
  }
}
