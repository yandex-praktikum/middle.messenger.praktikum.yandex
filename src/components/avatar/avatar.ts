import { classNames } from '@utilities';
import { Block } from '@services';

import AvatarTemplate from './avatar.hbs';
import './avatar.css';

interface Props {
  mode?: 'big' | 'small';
  imgSrc?: string;
  hover?: boolean;

	onClick?(): void;
}

export class Avatar extends Block<Props> {

  constructor(props: Props) {
    const className = classNames('avatar', {
      'avatar_big': props.mode === 'big',
      'avatar_small': props.mode === 'small',
      'avatar_hover': !!props.hover
    });

    super('div', className, props);
  }

  render(): DocumentFragment {
    return this.compile(AvatarTemplate, { imgSrc: this.props.imgSrc });
  }
}
