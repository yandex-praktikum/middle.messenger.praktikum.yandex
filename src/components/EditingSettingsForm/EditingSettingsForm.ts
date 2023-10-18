import { Block, Store, StoreEvents } from "../../core/index";
import template from "./EditingSettingsForm.tmp.pug";
import { getValuesFromForm } from "../utils/index";
import { UsersController } from "../../controllers";
import { isEqualObjects } from "../../utils";

import type { Event } from "../utils/getValuesFromForm";

export default class EditingSettingsForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          this.hideError();
          const formData = getValuesFromForm(event, this);

          const {
            user: {
              display_name,
              first_name,
              second_name,
              email,
              phone,
            },
          } = Store.getState();

          const user = {
            display_name,
            first_name,
            second_name,
            email,
            phone,
          }

          if (!isEqualObjects(formData, user)) {
            UsersController.changeProfile(formData);
          }

          const avatarFile = this.element.querySelector('#avatar').files[0];
          if (avatarFile) {
            const formData = new FormData();
            formData.set('avatar', avatarFile);

            UsersController.changeAvatar(formData);
          }
        }],
      ]),
    }

    super('div', newProps);

    Store
      .on(StoreEvents.UserUpdate, () => {
        const {
          user: {
            display_name,
            first_name,
            second_name,
            email,
            phone,
          },
        } = Store.getState();
        const {
          nickname: nicknameField,
          firstName: firstNameField,
          secondName: secondNameField,
          email: emailField,
          phone: phoneField,
        } = this.children;

        if (display_name) {
          nicknameField.setProps({
            value: display_name,
          })
        }

        if (first_name) {
          firstNameField.setProps({
            value: first_name,
          })
        }

        if (second_name) {
          secondNameField.setProps({
            value: second_name,
          })
        }

        if (email) {
          emailField.setProps({
            value: email,
          })
        }

        if (phone) {
          phoneField.setProps({
            value: phone,
          })
        }
      })
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
