import Block from '../../utils/Block';
import { template } from './textarea.templ';
import * as stylesDefs from './styles.module.scss';

const styles = stylesDefs.default;

export interface InputProps {
  name: string;
  cols?: number;
  rows?: number;
  spellcheck?: boolean | 'default';
  wrap?: 'soft' | 'hard' | 'off';
  placeholder?: string;
}

export class TextArea extends Block {
  constructor(props: InputProps) {
    super({
      spellcheck: true,
      wrap: 'soft',
      placeholder: 'Write a message...',
      cols: 4,
      rows: 5,
      ...props,
    });
  }

  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c: string) => styles[c]);
    }
  }

  public setValue(value: string) {
    (this.element as HTMLInputElement).value = value;
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
