const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phone = /(?=^\+?\d{10,15}$)/;
const login = /(?=^[a-zA-Z\d\-\_]{3,20}$)/;
const password = /(?=^[A-ZА-Яа-яa-z\d.]{8,40}$)/;
const letters = /[A-Z А-Я Ё][a-z а-я -]+$/;
const lettersLatin = /[A-Za-z]/;
const numbers = /\d/;
const expNumbers = /[^0-9\+]/;

const filteredNumber = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(expNumbers, "");
};

const createError = (label: HTMLLabelElement, msgError: string) => {
  countErrors++;
  if (label.querySelector(".validation-error")) return;
  const input = label.querySelector("input");

  const div = document.createElement("div");
  div.textContent = msgError;
  div.classList.add("validation-error");

  input?.classList.add("input-validation-error");
  label.appendChild(div);
};

const clearError = (label: HTMLLabelElement) => {
  const msgError = label.querySelector(".validation-error");
  const input = label.querySelector("input");

  msgError?.remove();
  input?.classList.remove("input-validation-error");
};

let countErrors = 0;

const validateInput = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  const attribute = target.getAttribute("name");
  const label = target.parentNode as HTMLLabelElement;
  const value = target.value;

  const checkingDomElements = attribute;

  if (checkingDomElements)
    switch (attribute) {
      case "email": {
        const checking = email.test(value);

        !checking
          ? createError(label, "Некорректный email")
          : clearError(label);
        break;
      }
      case "login": {
        const checking = login.test(value) && lettersLatin.test(value);

        !checking
          ? createError(label, "3 - 20 символов, латиница, без пробелов")
          : clearError(label);
        break;
      }
      case "first_name": {
        const checking = letters.test(value);
        !checking
          ? createError(label, "Нужно указать имя c заглавной буквы")
          : clearError(label);
        break;
      }
      case "second_name": {
        const checking = letters.test(value);
        !checking
          ? createError(label, "Нужно указать фамилию c заглавной буквы")
          : clearError(label);
        break;
      }
      case "phone": {
        const checking = phone.test(value);

        !checking
          ? createError(label, "Некорректный номер телефона")
          : clearError(label);
        break;
      }
      case "password":
      case "oldPassword":
      case "newPassword": {
        const checking =
          password.test(value) &&
          lettersLatin.test(value) &&
          numbers.test(value);
        !checking
          ? createError(
              label,
              "8 - 40 символов, латиница, заглавная буква и цифра"
            )
          : clearError(label);
        break;
      }

      case "password-confirm":
      case "repeat_password": {
        const passwordValue = (document.querySelector(
          'input[name="password"]'
        ) ||
          document.querySelector(
            'input[name="newPassword"]'
          )) as HTMLInputElement;

        const checking = value == passwordValue?.value;

        !checking
          ? createError(label, "Пароли не совпадают")
          : clearError(label);
        break;
      }

      case "display_name": {
        const checking = login.test(value) && lettersLatin.test(value);

        !checking
          ? createError(label, "3 - 20 символов, латиница, без пробелов")
          : clearError(label);
        break;
      }

      case "message": {
        const checking = value.length > 0;

        !checking ? createError(label, "") : clearError(label);
        break;
      }

      default: {
        console.log("default");
        console.log(attribute);
      }
    }
};

const filterSubmit = (form: HTMLFormElement) => {
  countErrors = 0;
  for (let i = 0; i < form.length; i++) {
    if (form[i].tagName === "INPUT") {
      (form[i] as HTMLElement).focus();
    }
  }
  if (countErrors > 0) {
    countErrors = 0;
    return false;
  } else {
    countErrors = 0;
    return true;
  }
};

export { filteredNumber, validateInput, filterSubmit };
