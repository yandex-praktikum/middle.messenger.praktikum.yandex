import { Block, Store, StoreEvents } from "../../core/index";
import template from "./UserSettings.tmp.pug";
import { Link, Button } from "../../components/index";
import { AuthController } from "../../controllers";

export default class UserSettings extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      baseURL: import.meta.env.VITE_BASE_URL,
      logoutBtn: new Button({
        className: 'modal__close',
        type: 'button',
        text: 'logout',
        events: new Map([['click', () => {
          AuthController.logout();
        }]]),
      }),
      avatar: '-',
      display_name: '-',
      first_name: '-',
      second_name: '-',
      email: '-',
      phone: '-',
      login: '-',
      linkToSettings: new Link({
        href: '/editing-settings',
        text: 'Change settings',
      }),
      linkToPassword: new Link({
        href: '/editing-password',
        text: 'Change password',
      }),
      linkToChats: new Link({
        href: '/messenger',
        text: 'Chats page',
      }),
    }
    super('div', newProps);

    AuthController.getUserInfo();

    Store
      .on(StoreEvents.UserUpdate, () => {
        const {
          user: {
            avatar,
            display_name,
            first_name,
            second_name,
            email,
            phone,
            login,
          },
        } = Store.getState();

        this.setProps({
          avatar,
          display_name,
          first_name,
          second_name,
          email,
          phone,
          login,
        })
      })
  }

  render() {
    return this.compile(template, this.props);
  }
}
