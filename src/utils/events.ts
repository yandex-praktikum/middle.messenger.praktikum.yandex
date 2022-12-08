import { filterSubmit } from "./validationForm";

const element = (form: HTMLFormElement) => {
  const result: Record<string, string | number> = {};

  for (let i = 0; i < form.length; i++) {
    if (form[i].tagName === "INPUT") {
      const input = form[i] as HTMLInputElement;
      const nameInput = input?.getAttribute("name") as string;
      result[nameInput] = input.value;
    }
  }

  return result;
};

export const submit = (event: Event) => {
  event.preventDefault();

  const form = event.currentTarget && (event.currentTarget as HTMLFormElement);

  if (form && filterSubmit(form)) {
    const result = element(form);
    console.log(result);
    return result;
  } else {
    return false;
  }
};

export const addEventSubmit = (
  formSelector: string,
  cb: null | (() => void) = null
): void => {
  const form = document.querySelector(formSelector);
  form?.addEventListener("submit", (e) => {
    if (submit(e)) {
      cb ? cb() : null;
    }
  });
};
