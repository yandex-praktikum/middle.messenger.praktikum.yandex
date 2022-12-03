type validationCondition = {
	callback: (value: string) => boolean,
	error: string
}

type conditionsObject = {
	[name: string]: validationCondition
}

export const VALIDATION_RULES: conditionsObject = {

	firstName:{
		callback: (value: string) => /^[а-яё]+$/i.test(value),
		error: 'Нужно указать имя'
	},

	lastName: {
		callback: (value: string) => /^[а-яё]+$/i.test(value),
		error: 'Нужно указать фамилию'
	},

	login: {
		callback: (value: string) => /^[a-z0-9_]+$/i.test(value),
		error: 'Логин может содержать латинские символы, цифры и знак _'
	},

	phone: {
		callback: (value: string) => /^\+?[0-9\(\)-]+$/.test(value),
		error: 'Номер телефона может содержать цифры, скобки, пробелы и знак -'
	},

	passwordLength: {
		callback: (value: string) => value.length > 7,
		error: 'Пароль должен быть не короче 8 символов'
	},

	passwordSymbols: {
		callback: (value: string) => /[A-Z]/.test(value) && /\d/.test(value) && /[a-z]/.test(value),
		error: 'Пароль должен содержать только буквы латинского алфавита, хотя бы одну цифру, одну строчную и одну прописную букву'
	}
}

class Validator {

	constructor(private errorField: HTMLElement, private validators: {
		[fieldName: string]: {
			element: HTMLInputElement,
			validators: validationCondition[]
		}
	}) {}

	comparePaswords(passwordName: string, secondpasswordName: string): boolean {
		if (!(passwordName in this.validators) || !(secondpasswordName in this.validators)) {
			throw 'Значения паролей не добавлены в валидатор'
		}

		const password = this.validators[passwordName].element.value
		const secondpassword = this.validators[secondpasswordName].element.value

		if (password.length && secondpassword.length && password !== secondpassword) {
			this.setErrorValue('Пароли не совпадают')
			return false
		}

		return true
	}

	getFormFields(): HTMLInputElement[] {
		return Object.values(this.validators).map(function (object){
			return object.element
		})
	}

	runValidation(): boolean {
		this.resetErrorValue()

		for (let fieldName in this.validators) {
			if (!this.validateField(fieldName)) {
				return false
			}
		}

		return true
	}

	private validateField(fieldName: string): boolean {
		return this.validators[fieldName].validators.every(condition => {
			const validationResult = condition.callback.call(this, this.validators[fieldName].element.value)

			if (validationResult !== true) {
				this.setErrorValue(condition.error)
				return false
			}

			return true
		})
	}

	resetErrorValue(): void {
		this.errorField.textContent = ''
	}

	private setErrorValue(errorText: string): void {
		this.errorField.textContent = errorText
	}
}

export { Validator as default, validationCondition}