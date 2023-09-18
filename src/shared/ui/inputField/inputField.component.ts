import { Component } from "@/shared/model";
import { InputFieldProps } from "./inputField.types";

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
    return `
      <div class="input-field {{#if error}}input__error{{/if}}" >
        <label class="input-field__label">
          {{{ Input
            ref="input"
            onBlur=onBlur
          }}}
          <div class="input__label">{{label}}</div>
        </label>
        {{{ ErrorLine error=error ref="errorLine"}}}
      </div>
    `;
  }
}

export { InputFieldComponent };
