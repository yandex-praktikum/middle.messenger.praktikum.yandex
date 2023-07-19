import Block from '../../utils/Block';
import { template } from './SearchForm.templ';
import { ButtonAwesome } from '../Buttons/buttons';
import { Input } from '../Input/input';
import * as stylesDefs from './styles.module.scss';

const styles = stylesDefs.default;

export class SearchForm extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new ButtonAwesome({
      icon: 'fas fa-search',
      title: 'Search...',
      events: {
        click: this.submit.bind(this),
      },
    });
    this.children.input = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Search...',
      classes: ['input-search'],
    });
  }

  submit() {
    const input = this.children.input as Input;
    const data = input.getValue();
    console.log('Search submitted');
    console.log(JSON.stringify(data, null, 2));
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
