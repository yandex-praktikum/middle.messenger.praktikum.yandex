
const initLoginFormInput = () => {
  const formInputs = document.querySelectorAll('.form-input input');

  const showLabel = (evt) => {
    const target = evt.target.closest('.form-input');
    target.classList.add('is-focused');
  };

  formInputs.forEach((item) => {
    item.addEventListener('input', showLabel);
    const inputParent = item.closest('.form-input');
    const hideLabel = () => {
      if (item.value === '') {
        inputParent.classList.remove('is-focused');
      }
    };
    item.addEventListener('input', hideLabel);
  });
};

export {initLoginFormInput};
