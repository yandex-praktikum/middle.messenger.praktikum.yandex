import { ValidatorError, ValidatorFn } from '@models';

export function requiredValidator(value: string): boolean | ValidatorError {
	if (!value) {
		return { error: 'Обязательное поле' };
	}
	return true;
}

export function lengthValidator(min: number, max: number): ValidatorFn {
	return function(value) {
		if (value.length < min || value.length > max) {
			return { error: `Допустимо от ${min} до ${max} символов` };
		}

		return true;
	};
}

export function emailValidator(value: string): boolean | ValidatorError {
	// eslint-disable-next-line no-useless-escape
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return { error: 'Некорретный email адрес' };
	}
	return true;
}

export function nameLettersValidator(value: string): boolean | ValidatorError {
	if (value[0] === value[0]?.toLowerCase()) {
		return { error: 'Первая буква должа быть заглавной' };
	}

	if (value.match(/[0-9]/)) {
		return { error: 'Поле содержит цифры' };
	}

	if (value && !/^[a-zA-Za-яA-Я-]+$/.test(value)) {
		return { error: 'Поле содержит недопустимые символы (.*+?^${}()|[]_)' };
	}

	return true;
}

export function usernameLettersValidator(value: string): boolean | ValidatorError {
	if (/^[0-9]+$/.test(value)) {
		return { error: 'Логин не должен состоять только из цифр' };
	}

	if (value && !/^[a-zA-Z0-9-_]+$/.test(value)) {
		return { error: 'Поле содержит недопустимые символы (.*+?^${}()|[])' };
	}

	return true;
}

export function passwordValidator(value: string): boolean | ValidatorError {
	if (!value.match(/[A-ZА-Я]/) || !value.match(/[0-9]/)) {
		return { error: 'Пароль должен содержать хотя бы одну заглавную букву и цифру' };
	}

	return true;
}

export function phoneNumberValidator(value: string): boolean | ValidatorError {
	// eslint-disable-next-line no-useless-escape
	if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
		return { error: 'Некорректный номер телефона' };
	}

	return true;
}

export function repeatValidator(inputName: string): ValidatorFn {
	return function(value) {
		const targetInput = document.querySelector(`input[name=${inputName}]`) as HTMLInputElement;

		if (targetInput.value !== value) {
			return { error: 'Пароли должны совпадать' };
		}

		return true;
	};
}

export const LOGIN_VALIDATORS = [lengthValidator(3, 20), usernameLettersValidator];
export const PASSWORD_VALIDATORS = [lengthValidator(8, 40), passwordValidator];
