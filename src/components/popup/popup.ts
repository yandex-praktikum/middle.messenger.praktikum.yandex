import { Block } from '../../utils/block';
import { IPopup } from '../../utils/interfaces'
import template from './popup.hbs';
import './popup.less';

export class Popup extends Block {
  constructor(props: IPopup) {
    const events = {};
    super({ ...props, events });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
