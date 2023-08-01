import { classNames } from '@utilities';
import { Block } from '@services';

import ButtonTemplate from './button.hbs';
import './button.css';

interface Props {
	attr?: {
		type?: 'button' | 'submit' | 'reset';
		role?: 'link'
	};
	className?: string;
  text?: string;
  imgSrc?: string;
	imgSize?: number;
  rounded?: boolean;
	noStyles?: boolean;

	onClick?(e: Event): void;
}

export class Button extends Block<Props> {

  constructor(props: Props) {
    const className = classNames('button', {
			[props.className as string]: !!props.className,
      'button_rounded': !!props.rounded,
      'button_no-styles': !!props.noStyles
    });

    super('button', className, props);
  }

  render(): DocumentFragment {
    return this.compile(ButtonTemplate, {
      text: this.props.text,
      imgSrc: this.props.imgSrc,
			imgSize: this.props.imgSize || 18
    });
  }
}
