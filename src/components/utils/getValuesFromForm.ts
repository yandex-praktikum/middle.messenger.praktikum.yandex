type Event = {
  preventDefault: Function
}

function isValidForm(form: Element) {
  const errors = form.querySelectorAll('.field-text--invalid');

  if (errors.length === 0) return true;

  return false;
}

export default function getValuesFromForm(event: Event, instance: any) {
  event.preventDefault();

  const formValues: any = {};

  Object.values(instance.children).forEach((child: any) => {
    if (child.value) {
      const { name } = child._meta.props;
      formValues[name] = child.value();
      child.validate();
    }
  })

  if (isValidForm(instance.element)) {
    return formValues;
  }

  return undefined;
}

export type {
  Event,
}
