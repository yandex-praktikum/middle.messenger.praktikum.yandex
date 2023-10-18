import { Block } from "../../core/index";
import template from "./Modal.tmp.pug";

import "./Modal.scss";

export default class Modal extends Block {
  bodyPaddingRightOriginal: any;
  backdrop: any;

  constructor(props?: object) {
    super('div', props);
    this._id = 'defaultModal';
    this.bodyPaddingRightOriginal =
      parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
    this.closeModal = this.closeModal.bind(this);
  }

  initClose() {
    document.addEventListener('click', this.closeModal);
  }

  removeClose() {
    document.removeEventListener('click', this.closeModal);
  }

  closeModal(event: any) {
    const { target } = event;
    if (
      target.getAttribute('data-modal') === 'close' ||
      !target.closest('.d-modal__content, [data-modal="open"]')
    ) {
      this.hide();
    }
  }

  show() {
    if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
      document.body.style.paddingRight = `${this.bodyPaddingRightOriginal}px`;
    }
    this.initClose();
    this.backdrop = document.createElement('div');
    document.body.classList.add('modal-open');
    const modal = document.getElementById(this._id);

    if (modal) {
      modal.classList.add('d-modal--show');
      modal.style.display = 'block';
      modal.ariaModal = 'true';
      modal.ariaHidden = null;
      modal.setAttribute('role', 'dialog');
    }

    this.backdrop.className = 'modal-backdrop';
    document.body.append(this.backdrop);
  }

  hide() {
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';

    const modal: HTMLElement | null = document.querySelector('.d-modal');

    if (!modal) {
      console.error('Modal element not found');

      return;
    }

    modal.classList.remove('d-modal--show');
    modal.style.display = 'none';
    modal.ariaModal = null;
    modal.ariaHidden = 'true';
    modal.removeAttribute('role');

    this.backdrop.remove();
    this.removeClose();
  }

  render() {
    return this.compile(template, this.props);
  }
}
