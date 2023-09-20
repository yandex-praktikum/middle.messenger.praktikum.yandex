import { Component } from "@/shared/model";
import profileStyles from "@/pages/profile/profilePage.module.css";
import editProfileStyles from "@/pages/editProfile/editProfilePage.module.css";

class EditPasswordPage extends Component {
  constructor() {
    super({
      passwordEditFields: [
        {
          title: "Старый пароль",
          type: "edit",
          inputType: "password",
          inputName: "oldPassword",
          value: "123456",
        },
        {
          title: "Новый пароль",
          type: "edit",
          inputType: "password",
          inputName: "newPassword",
          value: "123456",
        },
        {
          title: "Повторите новый пароль",
          type: "edit",
          inputType: "password",
          inputName: "newPasswordRepeat",
          value: "123456",
        },
      ],
    });
  }

  protected render() {
    return `
{{#> layout}}
  <div class="${profileStyles.profilePage} ${editProfileStyles.editProfilePage}">
          <div>
            {{{ SideButton to="/profile" }}}
          </div>
    <div class="${profileStyles.profile}">
      {{{ UserImage }}}
      <div class="${profileStyles.username}">
        Иван
      </div>

      <form>
              {{{ InfoList items=passwordEditFields }}}
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

export { EditPasswordPage };
