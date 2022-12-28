import { Block } from '../../utils/Block';
import { IInput } from '../../utils/Interfaces';
import { validate } from '../../utils/Validate';
import template from './input.hbs';
import './input.less';

export class Input extends Block {
  constructor(props: IInput) {
    const events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };
    super({ ...props, events });
  }

  onFocus = (e: Event): void => {
    validate(e, this.element!, '.input-error');
  };

  onBlur = (e: Event): void => {
    validate(e, this.element!, '.input-error');
  };

  render() {
    return this.compile(template, { ...this.props });
  }
}
