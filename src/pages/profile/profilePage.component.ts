import { Component } from "@/shared/model";
import styles from "./profilePage.module.css";
import { ProfilePageProps } from "./profilePage.types";
import { AuthController } from "@/widgets/auth/api";
import { connect } from "@/shared/model/store/connect";

class ProfilePage extends Component {
  constructor(props: ProfilePageProps) {
    const authController = new AuthController();
    const { user } = window.store.getState();
    super({
      ...props,
      user,
      userInfoFields: [
        {
          title: "Почта",
          value: user?.email,
          type: "info",
        },
        {
          title: "Логин",
          value: user?.login,
          type: "info",
        },
        {
          title: "Имя",
          value: user?.first_name,
          type: "info",
        },
        {
          title: "Фамилия",
          value: user?.second_name,
          type: "info",
        },
        {
          title: "Имя в чате",
          value: user?.display_name,
          type: "info",
        },
        {
          title: "Телефон",
          value: user?.phone,
          type: "info",
        },
      ],
      userEditFields: [
        {
          title:
            '<a class="actions-list__edit" href="/profile-edit">Изменить данные</a>',
          type: "info",
        },
        {
          title:
            '<a class="actions-list__edit" href="/password-edit">Изменить пароль</a>',
          type: "info",
        },
        {
          title: '<a class="actions-list__exit" href="/signin">Выйти</a>',
          type: "info",
        },
      ],
      handleExitClick: () => {
        authController.logout();
      },
    });
  }
  protected render() {
    console.log(this.props);
    return `
      {{#> layout}}
        <div class="${styles.profilePage}">
          <div>
            {{{ SideButton to="/messenger" }}}
          </div>
          <div class="${styles.profile}">
            {{{ UserImage }}}
            <div class="${styles.username}">
              Иван
            </div>
              {{{ InfoList items=userInfoFields }}}
              {{{ Button label="Выйти" onClick=handleExitClick }}}
          </div>
        </div>
      {{/layout}}
    `;
  }
}

const ProfilePageWithStore = connect(({ user }) => ({ user }))(ProfilePage);
export { ProfilePageWithStore };
