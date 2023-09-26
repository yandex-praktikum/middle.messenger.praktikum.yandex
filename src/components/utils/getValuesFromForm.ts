type Event = {
  preventDefault: Function
}

export default function getValuesFromForm(event: Event, instance: any) {
  event.preventDefault();
  const formValues: Record<string, object> = {};

  Object.entries(instance.children).forEach(([name, child]: [string, any]) => {
    if (child.value) {
      formValues[name] = child.value();
      child.validate();
    }
  })

  console.log(formValues);
}

export type {
  Event,
}
