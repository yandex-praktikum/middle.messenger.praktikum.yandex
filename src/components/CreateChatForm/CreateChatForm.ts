import { Block } from "../../core/index";
import template from "./CreateChatForm.tmp.pug";
import { getValuesFromForm } from "../utils/index";
import { ChatsController } from "../../controllers";

import type { Event } from "../utils/getValuesFromForm";

export default class CreateChatForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          const formData = getValuesFromForm(event, this);
          if (formData) {
            ChatsController.create(formData);
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
