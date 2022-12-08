import { Error } from '../../components/error/error';
import { Block } from '../../utils/core/block';
import { errorPage404 } from './error404.tmpl';

type PageError = {
  error404?: Error;
};

class Page404 extends Block<PageError> {
  constructor(props: PageError) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(errorPage404, this.props);
  }
}

export { Page404 };
