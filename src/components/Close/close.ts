import { Block } from '../../utils/block';
import { IClose } from '../../utils/interfaces'
import template from './close.hbs';
import './close.less';

export class Close extends Block {
  constructor(props: IClose) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
