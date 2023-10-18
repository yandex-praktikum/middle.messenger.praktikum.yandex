import { Block } from "../../core/index";
import template from "./DeleteUserForm.tmp.pug";
import { ChatsController } from "../../controllers";
import getValuesFromForm from "../utils/getValuesFromForm";

import type { Event } from "../utils/getValuesFromForm";

export default class DeleteUserForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', async (event: Event) => {
          event.preventDefault();
          this.hideError();
          this.hideResult();

          const formData = getValuesFromForm(event, this);

          if (formData) {
            const res = await ChatsController.deleteUsers(formData);

            this.setProps({
              errorText: res,
            })
            this.showResult();
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

  public showResult() {
    this.element.querySelector('.form__field--ok').classList.add('active');
  }

  public hideResult() {
    this.element.querySelector('.form__field--ok').classList.remove('active');
  }

  render() {
    return this.compile(template, this.props);
  }
}
