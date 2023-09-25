import { Component } from "@/shared/model";
import styles from "./profilePage.module.css";
import { ProfilePageProps } from "./profilePage.types";

class ProfilePage extends Component {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      userInfoFields: [
        {
          title: "Почта",
          value: "pochta@yandex.ru",
          type: "info",
        },
        {
          title: "Логин",
          value: "ivanivanov",
          type: "info",
        },
        {
          title: "Имя",
          value: "Иван",
          type: "info",
        },
        {
          title: "Фамилия",
          value: "Иванов",
          type: "info",
        },
        {
          title: "Имя в чате",
          value: "Иван",
          type: "info",
        },
        {
          title: "Телефон",
          value: "+7 (909) 967 30 30",
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
    });
  }
  protected render() {
    return `
      {{#> layout}}
        <div class="${styles.profilePage}">
          <div>
            {{{ SideButton to="/chats" }}}
          </div>
          <div class="${styles.profile}">
            {{{ UserImage }}}
            <div class="${styles.username}">
              Иван
            </div>
              {{{ InfoList items=userInfoFields }}}
              {{{ InfoList items=userEditFields }}}
          </div>
        </div>
      {{/layout}}
    `;
  }
}

export { ProfilePage };
