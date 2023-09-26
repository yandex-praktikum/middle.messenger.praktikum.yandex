import { Block } from "../../core/index";
import template from "./FieldText.tmp.pug";
import templateSetting from "./FieldTextSetting.tmp.pug";
import { validateField } from "../utils/index";

import "./FieldText.scss";

export default class FieldText extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['blur', validateField],
      ]),
    }

    super('div', newProps);
  }

  public value() {
    return this.element.querySelector('input').value;
  }

  public validate() {
    const input = this.element.querySelector('input');
    validateField(input);
  }

  render() {
    const isSettingTmp = this.props.tmp;

    return this.compile(isSettingTmp ? templateSetting : template, this.props);
  }
}
