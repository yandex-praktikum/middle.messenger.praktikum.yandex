enum ValidateRuleType {
    Login = "login",
    Password = "password",
    Email = "email",
    FirstName = "first_name",
    SecondName = "second_name",
    Phone = "phone",
};

class FormValidator {
    private form;

    public constructor(parentEl: HTMLElement) {
        this.form = parentEl.querySelector("form") as HTMLFormElement;
    };

    init() {
        let isFormValid = true;
        const fields = this.form.querySelectorAll("[name]");

        fields.forEach((field) => {
            const input = field as HTMLInputElement;

            this.checkField(input);

            if (input.dataset.isValid === "false") {
                isFormValid = false;
                return false;
            }
        });

        if (isFormValid) {
            const formData = new FormData(this.form);

            for (const formDataKey of formData.entries()) {
                console.log(`${formDataKey[0]}: ${formDataKey[1]}`);
            }
        }
    };

    checkField(field: HTMLInputElement) {
        let isValid;
        const name = field.name;

        switch (name) {
            case ValidateRuleType.FirstName:
            case ValidateRuleType.SecondName:
                isValid = this._validateName(field);
                break;
            case ValidateRuleType.Login:
                isValid = this._validateLogin(field);
                break;
            case ValidateRuleType.Email:
                isValid = this._validateEmail(field);
                break;
            case ValidateRuleType.Password:
                isValid = this._validatePassword(field);
                break;
            case ValidateRuleType.Phone:
                isValid = this._validatePhone(field);
                break;
            default:
                isValid = true;
                break;
        }

        field.dataset.isValid = isValid.toString();
    };

    private _validateName(field: HTMLInputElement): boolean {
        const regExp = new RegExp(/^[а-яА-ЯёЁa-zA-Z-]+$/, "g");
        const errorEl = ((field.parentNode as HTMLElement).querySelector(".entry__error") as HTMLElement);

        errorEl.textContent = "";

        if (field.value === "") {
            errorEl.textContent = "Поле не должно быть пустым";
            return false;
        } else if (field.value[0] !== field.value[0].toUpperCase()) {
            errorEl.textContent = "Первая буква должна быть заглавной";
            return false;
        } else if (!regExp.test(field.value)) {
            errorEl.textContent = "Разрешены символы латиницы или кириллицы";
            return false;
        }
        
        return true;
    };

    private _validateLogin(field: HTMLInputElement): boolean {
        const regExp = new RegExp(/^[a-zA-Z0-9-_]*$/);
        const errorEl = ((field.parentNode as HTMLElement).querySelector(".entry__error") as HTMLElement);

        errorEl.textContent = "";
        
        if (field.value.length < 3 || field.value.length > 20) {
            errorEl.textContent = "Логин должен быть от 3 до 20 символов";

            return false;
        } else if (!/[^0-9]/.test(field.value)) {
            errorEl.textContent = "Логин не может состоять только из чисел";

            return false;
        } else if (field.value.includes(" ")) {
            errorEl.textContent = "Логин не может содержать пробелы";
        }

        if (!regExp.test(field.value)) {
            errorEl.textContent = "Не допустимые символы";

            return false;
        }

        return true;
    };

    private _validateEmail(field: HTMLInputElement): boolean {
        const regExp = new RegExp(/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/, "gi");
        const errorEl = ((field.parentNode as HTMLElement).querySelector(".entry__error") as HTMLElement);

        errorEl.textContent = "";

        if (!regExp.test(field.value)) {
            errorEl.textContent = "Не валидный email";

            return false;
        }
        
        return true;
    };

    private _validatePassword(field: HTMLInputElement): boolean {
        const regExp = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/);
        const errorEl = ((field.parentNode as HTMLElement).querySelector(".entry__error") as HTMLElement);

        errorEl.textContent = "";

        if  (field.value.length < 8 || field.value.length > 40) {
            errorEl.textContent = "Пароль должен содержать от 8 до 40 символов";

            return false;
        }

        if (!regExp.test(field.value)) {
            errorEl.textContent = "Не корректный пароль";

            return false;
        }
        
        return true;
    };

    private _validatePhone(field: HTMLInputElement): boolean {
        const regExp = new RegExp(/^(\+)?(\d){10,14}/);
        const errorEl = ((field.parentNode as HTMLElement).querySelector(".entry__error") as HTMLElement);

        errorEl.textContent = "";

        if (!regExp.test(field.value)) {
            errorEl.textContent = "Не верный формат номера";

            return false;
        }
        
        return true;
    };
};

export default FormValidator;
