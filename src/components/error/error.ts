import { Block } from '../../utils/core/block';
import { errorPage } from './error.tmpl';

type TError = {
  statusCode: number;
  statusDescription: string;
  button: string;
};

class Error extends Block<TError> {
  constructor(props: TError) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(errorPage, this.props);
  }
}

export { Error, TError };
