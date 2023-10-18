import { Block, Store, StoreEvents } from "../../core/index";
import template from "./UploadAvatarForm.tmp.pug";
import { ChatsController } from "../../controllers";

import type { Event } from "../utils/getValuesFromForm";

export default class UploadAvatarForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          event.preventDefault();
          this.hideError();

          const form = this.element.querySelector('form');
          const formData = new FormData(form);

          if (formData) {
            ChatsController.uploadAvatar(formData);

            Store.on(StoreEvents.Error, () => {
              const { error } = Store.getState();

              this.setProps({
                errorText: error,
              })
              this.showError();
            });
          }
        }],
      ]),
    }

    super('div', newProps);
  }

  public showError() {
    this.element.querySelector('.form__field--error').classList.add('active');
  }

  public hideError() {
    this.element.querySelector('.form__field--error').classList.remove('active');
  }

  render() {
    return this.compile(template, this.props);
  }
}
