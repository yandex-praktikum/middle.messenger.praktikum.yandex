import { BaseProps, Block } from '@services';
import { Fieldset } from '@components';

interface BaseFormProps {
	fields: Fieldset[];
}

export class FormAccessor<T extends BaseProps, U extends { props: BaseFormProps }> extends Block<T> {

	form!: U;

	get formData(): Record<string, string> {
		const formData: Record<string, string> = {};

		this.form.props.fields.forEach((field: Fieldset) => {
			formData[field.props.name] = field.getValue();
		});

		return formData;
	}

	constructor(public readonly tagName: string,
							public readonly classNames: string,
							propsAndChildren: T) {
		super(tagName, classNames, propsAndChildren);
	}

	validateForm(): boolean {
		let isValid = true;

		this.form.props.fields.forEach((field: Fieldset) => {
			isValid = field.forceValidations() && isValid;
		});

		return isValid;
	}
}
