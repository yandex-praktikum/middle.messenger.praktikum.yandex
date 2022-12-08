import { Block, TProperties} from '../../utils/core/block';
import { input } from './input.tmpl';

type TInput = {
  idInput?: string;
  classInput?: string;
  typeInput: string;
  nameInput: string;
  placeHolder?: string;
  valueInput?: string | number;
  readonly?: boolean;
  hidden?: boolean;
  autocomplete?: string;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class Input extends Block<TInput> {
  constructor(props: TInput) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(input, this.props);
  }
}

export { Input, TInput };
