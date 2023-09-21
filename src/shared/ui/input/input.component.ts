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

  render() {
    const { type, placeholder } = this.props;
    return `
      <input class="${styles.input}" ref="input" type="${type}" placeholder="${placeholder}" />
    `;
  }
}

export { InputComponent };
