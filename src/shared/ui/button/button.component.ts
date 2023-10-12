import { Component } from "@/shared/model";
import { ButtonProps } from "./button.types";
import styles from "./button.module.css";

class ButtonComponent extends Component {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): string {
    return `
      <button class="${styles.button}" type="button">
        {{label}}
      </button>
    `;
  }
}

export { ButtonComponent };
