enum ValidateRuleType {
    Message = "message",
    Email = "email",
    Login = "login",
    FirstName = "first_name",
    LastName = "second_name",
    DisplayName = "display_name",
    Phone = "phone",
    Password = "password",
    OldPassword = "oldPassword",
    NewPassword = "newPassword",
};

type ValidatationItem = {
    regex: RegExp;
    message: string;
}

const validations: Record<string, ValidatationItem> = {
    message: {
        regex: /^[-\s]+(\s+[-\s]+)*$/,
        message: "Поле не должно быть пустым",
    },
    email: {
        regex: /^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/,
        message: "Не валидный email",
    },
    login: {
        regex: /^[a-zA-Z0-9-_]*$/,
        message: "Не допустимые символы",
    },
    first_name: {
        regex: /^[а-яА-ЯёЁa-zA-Z-]+$/,
        message: "Разрешены символы латиницы или кириллицы",
    },
    second_name: {
        regex: /^[а-яА-ЯёЁa-zA-Z-]+$/,
        message: "Разрешены символы латиницы или кириллицы",
    },
    display_name: {
        regex: /^[а-яА-ЯёЁa-zA-Z-]+$/,
        message: "Разрешены символы латиницы или кириллицы",
    },
    phone: {
        regex: /^(\+)?(\d){10,15}/,
        message: "Не верный формат номера",
    },
    password: {
        regex: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/,
        message: "Не корректный пароль",
    },
    oldPassword: {
        regex: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/,
        message: "Не корректный пароль",
    },
    newPassword: {
        regex: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/,
        message: "Не корректный пароль",
    },
};

class Validator {
    validateField(type: string, value: string) {
        const regex = validations[type].regex;
        const message = validations[type].message;

        if (value.length === 0) {
            return "Поле не должно быть пустым";
        }

        switch (type) {
            case ValidateRuleType.Email:
                if (value.includes(" ")) {
                    return "Почта не может содержать пробелы";
                } else if (!regex.test(value)) {
                    return message;
                }
                break;
            case ValidateRuleType.Login:
                if (value.length < 3 || value.length > 20) {
                    return "Логин должен быть от 3 до 20 символов";
                } else if (!/[^0-9]/.test(value)) {
                    return "Логин не может состоять только из чисел";
                } else if (value.includes(" ")) {
                    return "Логин не может содержать пробелы";
                } else if (!regex.test(value)) {
                    return message;
                }
                break;
            case ValidateRuleType.FirstName:
            case ValidateRuleType.LastName:
            case ValidateRuleType.DisplayName:
                if (value[0] !== value[0].toUpperCase()) {
                    return "Первая буква должна быть заглавной";
                } else if (value.includes(" ")) {
                    return "Имя не может содержать пробелы";
                } else if (!regex.test(value)) {
                    return message;
                }
                break;
            case ValidateRuleType.Phone:
                if (value.length < 10 || value.length > 15) {
                    return "Телефон должен быть от 10 до 15 символов";
                } else if (value.includes(" ")) {
                    return "Телефон не может содержать пробелы";
                } else if (!regex.test(value)) {
                    return message;
                }
                break;
            case ValidateRuleType.Password:
            case ValidateRuleType.OldPassword:
            case ValidateRuleType.NewPassword:
                if (value.length < 8 || value.length > 40) {
                    return "Пароль должен содержать от 8 до 40 символов";
                } else if (value.includes(" ")) {
                    return "Пароль не может содержать пробелы";
                } else if (!regex.test(value)) {
                    return message;
                }
                break;
            default:
                break;
        }
    };

    validateForm(formClass: string) {
        if (formClass === "chat__message") {
            const messageField = document.querySelector(".chat__message-textarea");
            // @ts-ignore
            if (!messageField.value.length) {
                return false;
            }
        }
        
        let isFormValid = true;

        const formEl = document.querySelector(`.${formClass}`);
        const inputElems = formEl?.querySelectorAll(".form-input");
        const formData = this.getDataFromForm(formClass);

        Object.keys(formData).forEach((key, index) => {
            if (this.validateField(key, formData[key]) !== undefined) {
                // @ts-ignore
                const errEl = inputElems[index].parentNode.querySelector(".form__error");

                // @ts-ignore
                errEl.textContent = this.validateField(key, formData[key]);

                isFormValid = false;
                return false;
            }
        });

        if (isFormValid) {
            return formData;
        }
    };

    getDataFromForm(formClass: string) {
        const formEl = document.querySelector(`.${formClass}`) as HTMLFormElement;
        const formData = new FormData(formEl);

        let form: any = {};

        for (let [key, value] of formData.entries()) {
            form[key] = value;
        }

        return form;
    };
};

export default new Validator();

