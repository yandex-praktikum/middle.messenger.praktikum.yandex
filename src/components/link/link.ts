import { Block, Router } from '@services';

import './link.css';

interface Props {
	attr: {
		href: string;
	};
	text: string;
}

interface SuperProps extends Props {
	onClick(e: Event): void;
}

export class Link extends Block<SuperProps> {

	constructor(props: Props) {
		const superProps: SuperProps = {
			...props,
			onClick: e => this.onClick(e)
		};

		super('a', 'link', superProps);
	}

	onClick(e: Event) {
		e.preventDefault();

		const href = this.element.getAttribute('href')!;
		Router.go(href);
	}

	render(): DocumentFragment {
		return this.compile(null, { text: this.props.text });
	}
}
