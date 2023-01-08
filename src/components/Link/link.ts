import { Block } from '../../utils/block';
import { ILink } from '../../utils/interfaces'
import { withRouter } from '../../hocs/with-router';
import template from './link.hbs';
import './link.less';

export class BaseLink extends Block {
  constructor(props: ILink) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.path);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);
