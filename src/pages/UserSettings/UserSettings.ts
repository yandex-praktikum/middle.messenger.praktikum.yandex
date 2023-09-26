import { Block } from "../../core/index";
import template from "./UserSettings.tmp.pug";
import { Link } from "../../components/index";

export default class ChatsAndChat extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      userName: 'User name',
      linkToSettings: new Link({
        href: '/editing-settings/',
        text: 'Change settings',
      }),
      linkToPassword: new Link({
        href: '/editing-password/',
        text: 'Change password',
      }),
    }
    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
