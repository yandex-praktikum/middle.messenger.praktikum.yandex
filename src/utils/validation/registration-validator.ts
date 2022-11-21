import FormValidator from './input-validator'
import Validator from './validator'
import { VALIDATION_RULES } from './validator'

export { InputValidator as default }

class InputValidator extends FormValidator {

	protected createValidator(): Validator {
		
		const form = this.form

		if (!form) {
			throw new Error('Не найдена форма регистрации')
		}
		
		const name = form.querySelector('[name="name"]') as HTMLInputElement

		const surname = form.querySelector('[name="surname"]') as HTMLInputElement

		const login = form.querySelector('[name="login"]') as HTMLInputElement

		const phone = form.querySelector('[name="phone"]') as HTMLInputElement

		const password = form.querySelector('[name="password"]') as HTMLInputElement

		const repeatpassword = form.querySelector('[name="repeatpassword"]') as HTMLInputElement

		const errorMessageElement = form.querySelector('.error') as HTMLElement

		return new Validator(errorMessageElement, {
			name: {
				element: name,
				validators: [
					VALIDATION_RULES.firstName
				]
			},

			surname: {
				element: surname,
				validators: [
					VALIDATION_RULES.lastName
				]
			},

			login: {
				element: login,
				validators: [
					VALIDATION_RULES.login
				]
			},
			phone: {
				element: phone,
				validators: [
					VALIDATION_RULES.phone
				]
			},
			password: {
				element: password,
				validators: [
					VALIDATION_RULES.passwordLength,
					VALIDATION_RULES.passwordSymbols
				]
			},
			repeatpassword: {
				element: repeatpassword,
				validators: [
					VALIDATION_RULES.passwordLength,
					VALIDATION_RULES.passwordSymbols
				]
			}
		})
	}

	validateFormFields(): boolean {
		return this.validator.runValidation() && this.validator.comparePaswords('password', 'repeatpassword')
	}
}