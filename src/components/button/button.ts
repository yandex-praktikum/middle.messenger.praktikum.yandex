import { Block } from '../../utils/Block';
import { IButtonProps } from '../../utils/Interfaces';
import template from './button.hbs';
import './button.less';

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
