import { InputBaseElement } from '.';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { TValidationResult } from '../../services/Validators/type';

interface IProps {
  id: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  validate?: (value: string) => TValidationResult;
  onBlur: (event: ElementEvents['blur']) => void;
}

type Refs = {
  input: InputBaseElement;
};

export class UploadFile extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { disabled = false, type = '', placeholder = '', ...restProps } = props;

    super({
      ...restProps,
      disabled,
      placeholder,
      type,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    return this.refs.input.value();
  }

  public validate() {
    if (this.props.validate) {
      return this.props.validate(this.refs.input.value()).isValid;
    }

    return true;
  }

  protected render(): string {
    const { id, disabled, name } = this.props;
    return `
      <div class='uploadFile'>
        <label class='uploadFile__container'>
          {{{ InputBaseElement class='uploadFile__element' id="${id}" type="file" name="${name}" ${
            disabled ? 'disabled' : ''
          } }}}
          {{{ Text text='Выбрать файл на компьютере' type='secondary' weight='500' size='medium' underline=true }}}
        </label>
      </div>
    `;
  }
}
