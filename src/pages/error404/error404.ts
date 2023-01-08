import { Block } from '../../utils/block';
import Error from '../../components/error';
import template from './error404.hbs';
import './error404.less';

export class Error404 extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.error = new Error({
      number: '404',
      text: 'This page doesn’t exist',
      link: 'Back to chats',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
