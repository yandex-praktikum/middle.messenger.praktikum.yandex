import { classNames } from '@utilities';

import ArrowLinkTemplate from './arrow-link.hbs';
import './arrow-link.css';

export function ArrowLink({ label, href, reversed = false }) {
  const className = classNames('arrow-link', { 'arrow-link__reversed': reversed });
  return ArrowLinkTemplate({ hasLabel: !!label, label, href, className });
}
