import { Block, Store, StoreEvents } from "../../core/index";
import template from "./EditingPasswordForm.tmp.pug";
import { getValuesFromForm } from "../utils/index";
import { UsersController } from "../../controllers";

import type { Event } from "../utils/getValuesFromForm";

export default class EditingPasswordForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          this.hideError();
          const formData = getValuesFromForm(event, this);

          if (formData) {
            const { oldPassword, newPassword } = formData;
            const data = { oldPassword, newPassword }

            UsersController.changePassword(data);
          }
        }],
      ]),
    }

    super('div', newProps);

    Store
      .on(StoreEvents.Error, () => {
        const { error } = Store.getState();

        this.setProps({
          errorText: error,
        })
        this.showError();
      })
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
