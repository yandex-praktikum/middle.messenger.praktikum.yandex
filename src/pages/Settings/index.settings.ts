import Block from '../../utils/Block.js';
import { template } from './settings.templ.js';
import * as stylesDefs from './styles.module.scss';
import { Tag } from '../../components/Tags/tags.js';

const styles = stylesDefs.default;

export class SettingsPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.tag = new Tag({
      tag: 'p',
      content: 'Settings',
    });
    //
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
