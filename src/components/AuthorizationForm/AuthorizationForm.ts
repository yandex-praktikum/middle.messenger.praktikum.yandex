import { Block, Store, StoreEvents } from "../../core/index";
import template from "./AuthorizationForm.tmp.pug";
import { AuthController } from "../../controllers/index";
import { getValuesFromForm } from "../utils/index";
import { Event } from "../utils/getValuesFromForm";

export default class AuthorizationForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => {
          const formData = getValuesFromForm(event, this);

          if (formData) {
            AuthController.signin(formData);

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
