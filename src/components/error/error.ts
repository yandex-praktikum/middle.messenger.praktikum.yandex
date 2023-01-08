import { Block } from '../../utils/block';
import { IError } from '../../utils/interfaces'
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
