import { ArrowLink } from '@components';

import PanelTemplate from './panel.hbs';
import './panel.css';

export function Panel({ chatList }) {
  const profileLink = ArrowLink({ label: 'Профиль', href: '/profile' });
  return PanelTemplate({ profileLink, chatList });
}
