import { Block } from '../../utils/Block';
import { IField } from '../../utils/Interfaces';
import { validate } from '../../utils/Validate';
import template from './field.hbs';
import './field.less';

export class Field extends Block {
  constructor(props: IField) {
    const events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };
    super({ ...props, events });
  }

  onFocus = (e: Event): void => {
    validate(e, this.element!, '.profile-input-error');
  };

  onBlur = (e: Event): void => {
    validate(e, this.element!, '.profile-input-error');
  };

  render() {
    return this.compile(template, { ...this.props });
  }
}
