interface DOMStringMap {
  [name: string]: string | undefined
}

interface HTMLInputElement {
  value: string,
  dataset: DOMStringMap,
  closest: Function,
}

interface EventTarget {
  target: HTMLInputElement,
}

export default function validateField(event: EventTarget): void {
  const input = event.target || event;
  const { value } = input;
  const { pattern } = input.dataset;

  if (!pattern) {
    return;
  }

  const parent = input.closest('.field-text');
  const errClass = 'field-text--invalid';
  const regExp = new RegExp(pattern, 'g');

  if (!regExp.test(value)) {
    parent?.classList.add(errClass);
  } else {
    parent?.classList.remove(errClass);
  }
}
