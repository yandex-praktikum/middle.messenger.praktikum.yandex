import { classNames } from '@utilities';
import { Block, Router } from '@services';

import ArrowLinkTemplate from './arrowLink.hbs';
import './arrowLink.css';

interface Props {
	attr: {
		href: string;
	};
  label?: string;
  reversed?: boolean;
}

interface SuperProps extends Props {
	onClick(e: Event): void;
}

export class ArrowLink extends Block<SuperProps> {

  constructor(props: Props) {
		const superProps: SuperProps = {
			...props,
			onClick: e => this.onClick(e)
		};

    const className = classNames('arrow-link', { 'arrow-link_reversed': props.reversed });

    super('a', className, superProps);
  }

	onClick(e: Event) {
		e.preventDefault();

		const href = this.element.getAttribute('href')!;
		Router.go(href);
	}

  render(): DocumentFragment {
    return this.compile(ArrowLinkTemplate, { label: this.props.label });
  }
}
