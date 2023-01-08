import { Block } from '../../utils/block';
import { IButtonProps } from '../../utils/interfaces';
import template from './button.hbs';
import './button.less';

export class Button extends Block {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
