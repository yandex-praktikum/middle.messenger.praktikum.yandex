import Validator from './validator'
export { FormValidator as default }

abstract class FormValidator {
	protected validator: Validator
	protected form: HTMLElement | undefined = undefined

	constructor(form: HTMLElement) {
		this.form = form
		this.validator = this.createValidator()
		this.appendEventListeners()
	}

	protected abstract createValidator(): Validator

	appendEventListeners(): void {
		this.validator.getFormFields().forEach(field => {
			field.addEventListener('focus', () => this.validator.resetErrorValue())
			field.addEventListener('blur', () => this.validateFormFields())
		})
	}

	validateFormFields(): boolean {
		return this.validator.runValidation()
	}
}