import { Component } from "@/shared/model";
import { InputFieldProps } from "./inputField.types";
import styles from "./inputField.module.css";

class InputFieldComponent extends Component {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return false;
    }

    const input = this.refs.input.element as HTMLInputElement;
    return input.value;
  }

  private validate() {
    const input = this.refs.input.element as HTMLInputElement;
    const value = input.value;
    const error = this.props.validate?.(value);

    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }

    this.refs.errorLine.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    const { name, label, type, value = "", customClass = "" } = this.props;
    return `
      <div class="${styles.inputField} ${customClass}" >
        {{{ Input
          id="${name}"
          name="${name}"
          type="${type}"
          value="${value}"
          ref="input"
          onBlur=onBlur
        }}}
        <label for="${name}">
          ${label}
        </label>
        {{{ ErrorLine error=error ref="errorLine"}}}
      </div>
    `;
  }
}

export { InputFieldComponent };
