import { Block } from '../../utils/Block';
import { IError } from '../../utils/Interfaces';
import template from './error.hbs';
import './error.less';

export class Error extends Block {
  constructor(props: IError) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
