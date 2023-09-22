import { Component } from "@/shared/model";
import { InputProps } from "./input.types";
import styles from "./input.module.css";

class InputComponent extends Component {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  public value() {
    const input = this.element as HTMLInputElement;
    return input.value;
  }

  render() {
    const { type, name, placeholder = "", value } = this.props;
    return `
      <input class="${styles.input}" name="${name}" ref="input" id="${name}" type="${type}" placeholder="${placeholder}" value="${value}" />
    `;
  }
}

export { InputComponent };
