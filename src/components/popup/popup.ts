import { Block } from '@services';
import { hideAllPopups } from '@utilities';

import './popup.css';

interface Props {
	align?: 'start' | 'end' | 'center';
	content?: Block;
}

export class Popup extends Block<Props> {

	indent = 12;

	constructor(props: Props) {
		super('div', 'popup', props);

		this.hide();
	}

	show() {
		hideAllPopups();
		this.element.classList.remove('popup_hidden');
	}

	hide() {
		this.element.classList.add('popup_hidden');
	}

	attach(e: Event) {
		e.stopPropagation();

		this.show();

		const targetEl = e.target as HTMLElement;

		const targetElRect = targetEl.getBoundingClientRect();
		const popupRect = this.element.getBoundingClientRect();

		let left = targetElRect.left;
		let top = targetElRect.bottom + this.indent;

		if (this.props.align === 'end') {
			left = left - (popupRect.width - targetElRect.width);
		}

		if (this.props.align === 'center') {
			left = left - (popupRect.width - targetElRect.width) / 2;
		}

		if (top + popupRect.height > document.documentElement.clientHeight) {
			top = targetElRect.top - popupRect.height - this.indent;
		}

		this.element.style.top = `${top}px`;
		this.element.style.left = `${left}px`;
	}

	render(): DocumentFragment {
		return this.compile();
	}
}
