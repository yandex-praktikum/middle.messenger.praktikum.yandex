import { Block } from '../../utils/block';
import { IAvatar } from '../../utils/interfaces';
import template from './avatar.hbs';
import './avatar.less';

export class Avatar extends Block {
  constructor(props: IAvatar) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
