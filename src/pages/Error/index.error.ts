import Block from '../../utils/Block';
import { template } from './error.templ';
import { Link } from '../../components/Link/link';
import * as stylesDefs from './styles.module.scss';

const styles = stylesDefs.default;

export class ErrorPage404 extends Block {
  constructor() {
    super({ message: 'Nothing is here...', error: '404' });
  }

  init() {
    this.children.return = new Link({
      label: 'take me back already...',
      to: '/messenger',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export class ErrorPage500 extends Block {
  constructor() {
    super({ message: 'Something went wrong...', error: 'Server Error' });
  }

  init() {
    this.children.return = new Link({
      label: 'try to take me back.',
      to: '/messenger',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
