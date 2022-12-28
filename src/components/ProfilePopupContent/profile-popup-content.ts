import { Block } from '../../utils/Block';
import { IProfilePopupContent } from '../../utils/Interfaces';
import template from './profile-popup-content.hbs';
import { validate } from '../../utils/Validate';
import './profile-popup-content.less';

export class ProfilePopupContent extends Block {
  constructor(props: IProfilePopupContent) {
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
