const submitForm = (e: Event) => {
  e.preventDefault();

  type TFormMessageCollection = HTMLFormControlsCollection &
    Record<"message" | "file-msg" | "photo-msg", HTMLInputElement>;

  const formElements = (e.target as HTMLFormElement)
    .elements as TFormMessageCollection;

  const fileMsg = formElements["file-msg"];
  const photoMsg = formElements["photo-msg"];
  const message = formElements.message;

  const checkingFiledForm = message.value || photoMsg.value || fileMsg.value;

  const formDataMessage = new FormData();

  if (checkingFiledForm) {
    [fileMsg, photoMsg, message].forEach((input) => {
      input.value
        ? formDataMessage.append(
            input.getAttribute("name") as string,
            input.value
          )
        : console.log(input);
    });

    for (const key of formDataMessage.keys()) {
      console.log(`${key}: ${formDataMessage.get(key)}`);
    }
    return formDataMessage;
  }
};

export { submitForm };
