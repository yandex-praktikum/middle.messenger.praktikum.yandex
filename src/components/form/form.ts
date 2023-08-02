import { Block } from '@services';
import { isEqual } from '@utilities';

import { Fieldset } from '../fieldset/fieldset';
import { Button } from '../button/button';
import { Link } from '../link/link';

import FormTemplate from './form.hbs';
import './form.css';

interface Props<T> {
	title: string;
  fields: Fieldset[];
  buttonText: string;
	link?: Link;

  onSendData(formData: T): void;
}

interface SuperProps<T> extends Props<T> {
  button: Button;

	onSubmit(e: SubmitEvent): void;
}

type FormData<T extends Record<string, string>> = {
	[Key in keyof T]: string
}

export class Form<T extends FormData<T> = Record<string, any>> extends Block<SuperProps<T>> {

	initialFormData: Record<string, string> = {};

	get fields(): Fieldset[] {
		return this.props.fields;
	}

	get formData(): T {
		const formData: Record<string, string> = {};

		this.fields.forEach((field: Fieldset) => {
			formData[field.props.name] = field.getValue();
		});

		return formData as T;
	}

  constructor(props: Props<T>) {
    const superProps: SuperProps<T> = {
      ...props,
      button: new Button({
				attr: { type: 'submit' },
        text: props.buttonText
			}),
			onSubmit: e => this.onSubmit(e)
		};

    super('form', 'form', superProps);

		this.fields.forEach(field => this.initialFormData[field.props.name] = field.getValue());
  }

	validateForm(): boolean {
		let isValid = true;

		this.fields.forEach((field: Fieldset) => {
			isValid = field.forceValidations() && isValid;
		});

		return isValid;
	}

	patchValue(value: T) {
		this.fields.forEach(field => {
			field.setValue(value[field.props.name as keyof T] as string);
			this.initialFormData[field.props.name] = field.getValue();
		});
	}

	onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!this.validateForm() || isEqual(this.formData, this.initialFormData)) {
			return;
		}

		this.fields.forEach(field => {
			this.initialFormData[field.props.name] = field.getValue();
		});

		this.props.onSendData(this.formData);
	}

  render(): DocumentFragment {
    return this.compile(FormTemplate, {
			title: this.props.title,
      linkHref: this.props.linkHref,
      linkText: this.props.linkText
    });
  }
}
