import { Component } from "@/shared/model";
import styles from "./editProfilePage.module.css";
import profileStyles from "@/pages/profile/profilePage.module.css";

class EditProfilePage extends Component {
  constructor() {
    super({
      userEditFields: [
        {
          title: "Почта",
          type: "edit",
          inputName: "email",
          value: "mail@yandex.ru",
        },
        {
          title: "Логин",
          type: "edit",
          inputName: "login",
          value: "ivanovivan",
        },
        {
          title: "Имя",
          type: "edit",
          inputName: "firts_name",
          value: "Иван",
        },
        {
          title: "Фамилия",
          type: "edit",
          inputName: "last_name",
          value: "Иванов",
        },
        {
          title: "Имя в чате",
          type: "edit",
          inputName: "display_name",
          value: "Ivan",
        },
        {
          title: "Телефон",
          type: "edit",
          inputName: "phone",
          value: "+7 (909) 123 45 67",
        },
      ],
    });
  }
  protected render() {
    return `
{{#> layout}}
  <div class="${profileStyles.profilePage} ${styles.editProfilePage}">
          <div>
            {{{ SideButton to="/profile" }}}
          </div>
    <div class="${profileStyles.profile}">
      {{{ UserImage }}}
      <div class="${profileStyles.username}">
        Иван
      </div>

      <form>
              {{{ InfoList items=userEditFields }}}
      <div class="profile_buttons">
        {{{ Button label="Сохранить"}}}
      </div>
      </form>
    </div>
  </div>
{{/layout}}

`;
  }
}

export { EditProfilePage };
