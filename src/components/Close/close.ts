import { Block } from '../../utils/Block';
import { IClose } from '../../utils/Interfaces';
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
