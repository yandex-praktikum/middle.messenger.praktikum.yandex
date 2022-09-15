
const initModal = () => {
  const modalChange = document.querySelectorAll('.modal--change');
  const openModalChangeButtons = document.querySelectorAll('.profile-form__button-save');
  const modalCloseButtons = document.querySelectorAll('.modal-change__button');

  if (modalChange) {
    const openModalChange = () => {
      modalChange.forEach((modal) => {
        modal.classList.add('show');
      });
    };

    const closeModalChange = () => {
      modalChange.forEach((modal) => {
        modal.classList.remove('show');
      });
    };

    openModalChangeButtons.forEach((button) => {
      button.addEventListener('click', openModalChange);
    });

    modalCloseButtons.forEach((button) => {
      button.addEventListener('click', closeModalChange);
    });
  }

};

export {initModal};
