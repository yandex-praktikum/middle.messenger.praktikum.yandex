import { Block } from '../../utils/Block';
import { IAvatar } from '../../utils/Interfaces';
import template from './avatar.hbs';
import './avatar.less';

export class Avatar extends Block {
  constructor(props: IAvatar) {
    const events = {};
    super({ ...props, events });

  }


  render() {
    return this.compile(template, { ...this.props });
  }
}
