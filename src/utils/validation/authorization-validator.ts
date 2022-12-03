import FormValidator from './input-validator'
import Validator from './validator'
import { VALIDATION_RULES } from './validator'

export { InputValidator as default }

class InputValidator extends FormValidator {

	protected createValidator(): Validator {
		
		const form = this.form

		if (!form) {
			throw new Error('Не найдена форма логина')
		}

		const errorMessageElement = form.querySelector('.error') as HTMLElement
		
		const login = form.querySelector('[name="login"]') as HTMLInputElement

		const password = form.querySelector('[name="password"]') as HTMLInputElement

		return new Validator(errorMessageElement, {
			login: {
				element: login,
				validators: [
					VALIDATION_RULES.login
				]
			},
			password: {
				element: password,
				validators: [
					VALIDATION_RULES.passwordLength,
					VALIDATION_RULES.passwordSymbols
				]
			}
		})
	}
}