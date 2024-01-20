import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';

interface IProps {
  id: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onBlur?: (event: ElementEvents['blur']) => void;
  events: {
    blur: (event: ElementEvents['blur']) => void;
  };
}

type Refs = {
  input: HTMLInputElement;
};

export class InputBaseElement extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { disabled = false, className = 'input__element', type = '', placeholder = '', ...restProps } = props;

    const blur = (event: ElementEvents['blur']) => {
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    super({
      ...restProps,
      disabled,
      placeholder,
      type,
      className,
      events: {
        blur,
      },
    });
  }

  public value() {
    return this.refs.input.value;
  }

  protected render(): string {
    const { id, value, disabled, className, type, name, placeholder } = this.props;

    return `
      <input 
      class=${className} 
      ref="input" 
      id="${id}" 
      type="${type}" 
      name="${name}"
      value='${value}' 
      placeholder='${placeholder}' ${disabled ? 'disabled' : ''}/>
    `;
  }
}
