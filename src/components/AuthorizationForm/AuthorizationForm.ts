import { Block } from "../../core/index";
import template from "./AuthorizationForm.tmp.pug";
import { getValuesFromForm } from "../utils/index";

export default class AuthorizationForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: object) => getValuesFromForm(event, this)],
      ]),
    }

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
