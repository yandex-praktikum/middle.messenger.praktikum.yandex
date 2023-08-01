import { Block } from '@services';

import { Fieldset } from '../fieldset/fieldset';
import { Button } from '../button/button';

import FormTemplate from './form.hbs';
import './form.css';

interface Props {
  fields: Fieldset[];
  buttonText: string;
  linkHref?: string;
  linkText?: string;

  onSubmit(e: SubmitEvent): void;
}

interface SuperProps extends Omit<Props, 'onSubmit'> {
  button: Button;
}

export class Form extends Block<SuperProps> {

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      button: new Button({
				attr: { type: 'submit' },
        text: props.buttonText
			})
    };

    super('form', 'form', superProps);
  }

  render(): DocumentFragment {
    return this.compile(FormTemplate, {
      linkHref: this.props.linkHref,
      linkText: this.props.linkText
    });
  }
}
