import { classNames } from '@utilities';

import AvatarTemplate from './avatar.hbs';
import './avatar.css';

export function Avatar({ imgLink = '', mode = 'normal', hover = false }) {
  const className = classNames('avatar', {
    'avatar_big': mode === 'big',
    'avatar_small': mode === 'small',
    'avatar_hover': !!hover
  });

  return AvatarTemplate({ imgLink, hasLink: !!imgLink, className });
}
