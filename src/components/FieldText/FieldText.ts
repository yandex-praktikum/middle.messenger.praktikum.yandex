import { Block } from "../../core/index";
import template from "./FieldText.tmp.pug";
import templateSetting from "./FieldTextSetting.tmp.pug";
import { validateField } from "../utils/index";

import "./FieldText.scss";

export default class FieldText extends Block {
  constructor(props?: any) {
    const { events = new Map() } = props;
    if (events.size === 0) {
      events.set('blur', validateField);
    }

    super('div', { ...props, events });
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
