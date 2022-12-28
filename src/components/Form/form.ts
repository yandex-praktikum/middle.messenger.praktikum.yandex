import { Block } from '../../utils/Block';
import { IForm } from '../../utils/Interfaces';
import template from './form.hbs';
import './form.less';

export class Form extends Block {
  constructor(props: IForm) {
    const events = {};
    super({ ...props, events });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
