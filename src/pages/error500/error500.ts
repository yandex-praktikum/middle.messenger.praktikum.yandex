import { Block } from '../../utils/core/block';
import { Error } from '../../components/error/error';
import { errorPage500 } from './error500.tmpl';

type PageError = {
  error500?: Error;
};

class Page500 extends Block<PageError> {
  constructor(props: PageError) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(errorPage500, this.props);
  }
}

export { Page500 };
