import { Block, Store, StoreEvents } from "../../core/index";
import template from "./RegistrationForm.tmp.pug";
import AuthController from "../../controllers/AuthController";
import { getValuesFromForm } from "../utils/index";
import { Event } from "../utils/getValuesFromForm";

// import type { SignupData } from "../../api/auth-api";

export default class RegistrationForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          const formData = getValuesFromForm(event, this);

          if (formData) {
            AuthController.signup(formData);

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
