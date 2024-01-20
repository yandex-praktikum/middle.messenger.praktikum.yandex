import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { TValidationResult } from '../../services/Validators/type';

import { ErrorLine } from '..';
import { InputBaseElement } from '.';

interface IProps {
  id: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  validate?: (value: string) => TValidationResult;
  onBlur: (event: ElementEvents['blur']) => void;
}

type Refs = {
  input: InputBaseElement;
  errorLine: ErrorLine;
};

export class Input extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { disabled = false, value = '', type = '', placeholder = '', ...restProps } = props;

    super({
      ...restProps,
      disabled,
      placeholder,
      type,
      value,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    return this.refs.input.value();
  }

  public validate() {
    let validation: TValidationResult = { isValid: true };

    if (this.props.validate) {
      validation = this.props.validate(this.refs.input.value());
    }

    if (!validation.isValid) {
      this.refs.errorLine.setProps({ error: validation.message });
      return validation.isValid;
    }

    this.refs.errorLine.setProps({ error: undefined });
    return validation.isValid;
  }

  protected render(): string {
    const { id, disabled, type, name, placeholder, value } = this.props;
    return `
      <div class='input'>
        <label class='input__container'>
        {{{ InputBaseElement 
          className='input__element' 
          ref="input" id="${id}" 
          type="${type}" 
          name="${name}" 
          value="${value}"
          placeholder='${placeholder}' ${disabled ? 'disabled' : ''}
          onBlur=onBlur }}}
        </label>
        {{{ ErrorLine error=error ref="errorLine" }}}
      </div>
    `;
  }
}
