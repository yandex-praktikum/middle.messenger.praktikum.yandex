import { classNames } from '@utilities';
import { Block } from '@services';

import ArrowLinkTemplate from './arrowLink.hbs';
import './arrowLink.css';

interface Props {
	attr: {
		href: string;
	};
  label?: string;
  reversed?: boolean;
}

export class ArrowLink extends Block<Props> {

  constructor(props: Props) {
    const className = classNames('arrow-link', { 'arrow-link_reversed': !!props.reversed });

    super('a', className, props);
  }

  render(): DocumentFragment {
    return this.compile(ArrowLinkTemplate, { label: this.props.label });
  }
}
