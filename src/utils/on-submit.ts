import { validateExp } from './reg-exp';
import { trim } from './helpers';

export function onSubmit(e: Event, inputClass: string) {
  e.preventDefault();
  let inputs = null;
  if (inputClass === 'profile-validated-input') {
    inputs = document.querySelectorAll('.profile-validated-input');

  } else if (inputClass === 'password-validated-input') {
    inputs = document.querySelectorAll('.password-validated-input');

  } else if (inputClass === 'avatar-validated-input') {
    inputs = document.querySelectorAll('.avatar-validated-input');

  } else if (inputClass === 'chat-validated-input') {
    inputs = document.querySelectorAll('.chat-validated-input');

  } else if (inputClass === 'delete-chat-validated-input') {
    inputs = document.querySelectorAll('.delete-chat-validated-input');

  } else if (inputClass === 'add-user-validated-input') {
    inputs = document.querySelectorAll('.add-user-validated-input');

  } else if (inputClass === 'delete-user-validated-input') {
    inputs = document.querySelectorAll('.delete-user-validated-input');
    
  } else {
    inputs = document.querySelectorAll('.validated-input');
  }

  const windowError: HTMLElement | null = document.querySelector('.error');
  windowError!.textContent = 'fill in the form correctly';
  
  const isError: boolean = Array.from(inputs).some((input: Element) => {
    const inputWithType = input as HTMLInputElement | null;
    const value = trim(inputWithType!.value);
    const name = inputWithType!.name;

    if (name === 'message') {
      windowError!.textContent = 'message is empty';
      setTimeout(() => {
        windowError!.style.display = 'none';
      }, 1000);
    }
    return !validateExp[name].regExp.test(value);
  });

  if (isError) {
    windowError!.style.display = 'block';
    return;
  }

  windowError!.style.display = 'none';
  const values: Record<string, string> = {};
  inputs.forEach((input) => {
    const inputWithType = input as HTMLInputElement | null;
    const value = inputWithType!.value;
    const name = inputWithType!.name;
    if (name === 'repeat_password') return;
    values[name] = value;
  });

  return values;
}
