import { classNames } from '@utilities';

import ArrowRoundTemplate from './arrow-round.hbs';
import './arrow-round.css';

export function ArrowRound({ reversed = false }) {
  const className = classNames('arrow-round', { 'reversed': reversed });
  return ArrowRoundTemplate({ className });
}
