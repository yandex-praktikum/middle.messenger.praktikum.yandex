import { Block } from '../../utils/block';
import { IFields } from '../../utils/interfaces'
import { onSubmit } from '../../utils/on-submit';
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
