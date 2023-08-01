import { FormField, ValidatorError, ValidatorFn } from '@models';
import { Input, Error } from '@components';
import { classNames } from '@utilities';
import { Block } from '@services';

import FieldsetTemplate from './fieldset.hbs';
import './fieldset.css';

interface Props<T> extends FormField<T> {
  mode?: 'horizontal';
}

interface SuperProps<T> extends Props<T> {
  input: Input<T>;
  validators: ValidatorFn[];
  errors: Error[];
}

export class Fieldset<T = string> extends Block<SuperProps<T>> {

  constructor(props: Props<T>) {
    const inputProps: FormField<T> = {
      name: props.name,
      label: props.label,
      type: props.type,
      value: props.value,
			disabled: props.disabled
    };

    const superProps: SuperProps<T> = {
      ...props,
      validators: props.validators || [],
      input: new Input<T>({
        attr: { ...inputProps, placeholder: ' ' },
				onBlur: () => this.forceValidations()
      }),
      errors: []
    };

    const className = classNames('fieldset', {
      'fieldset_vertical': props.mode !== 'horizontal',
      'fieldset_horizontal': props.mode === 'horizontal'
    });

    super('fieldset', className, superProps);
  }

  getValue(): string {
    return this.props.input.getValue();
  }

  forceValidations(): boolean {
    const errors = this.props.validators
			.reduce((acc, validatorFn) => {
				const result = validatorFn(this.getValue());

				if ((result as ValidatorError).error) {
					acc.push((result as ValidatorError).error);
				}

				return acc;
			}, [] as string[])
			.map(error => new Error({ text: error }));

		this.setProps({ errors });

		const isValid = errors.length === 0;

		isValid
			? this.element.classList.remove('fieldset_invalid')
			: this.element.classList.add('fieldset_invalid');

    return isValid;
  }

  render(): DocumentFragment {
    return this.compile(FieldsetTemplate, {
      label: this.props.label,
      isHorizontalMode: this.props.mode === 'horizontal'
    });
  }
}
