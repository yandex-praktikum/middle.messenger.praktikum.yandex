import { Block } from '../../utils/Block';
import { IFields } from '../../utils/Interfaces';
import { onSubmit } from '../../utils/OnSubmit';
import template from './fields.hbs';
import './fields.less';

export class Fields extends Block {
  constructor(props: IFields) {
    const events = {
      submit: (e: Event, className: string) => onSubmit(e, className),
    };
    super({ ...props, events });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
