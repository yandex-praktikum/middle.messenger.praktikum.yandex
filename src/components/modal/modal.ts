import { Block } from '@services';

import { Button } from '../button/button';

import ModalTemplate from './modal.hbs';
import './modal.css';

interface Props {
	content: Block;
}

interface SuperProps extends Props {
	closeButton: Button;
}

export class Modal extends Block<SuperProps> {

	constructor(props: Props) {
		const superProps: SuperProps = {
			...props,
			closeButton: new Button({
				className: 'modal__close-btn',
				imgSrc: 'icons/close.svg',
				imgSize: 20,
				noStyles: true,
				onClick: () => this.hide()
			})
		};

		super('div', 'overlay', superProps);

		this.hide();
	}

	show() {
		this.element.style.transform = 'scale(1)';
		this.element.classList.remove('overlay_hidden');
	}

	hide() {
		this.element.classList.add('overlay_hidden');

		setTimeout(() => {
			this.element.style.transform = 'scale(0)';
			this.props.content?.resetState();
		}, 500);
	}

	render(): DocumentFragment {
		return this.compile(ModalTemplate);
	}
}
