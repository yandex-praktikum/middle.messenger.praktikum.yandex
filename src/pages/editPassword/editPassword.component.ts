import { Component } from "@/shared/model";
import profileStyles from "@/pages/profile/profilePage.module.css";
import editProfileStyles from "@/pages/editProfile/editProfilePage.module.css";
import { validatePassword } from "@/shared/lib";
import { EditProfilePageProps } from "../editProfile/editProfilePage.types";

class EditPasswordPage extends Component {
  constructor(props: EditProfilePageProps) {
    super({
      ...props,
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const oldPassword =
          this.refs.fields.refs.oldPassword.refs.oldPassword.value();
        const newPassword =
          this.refs.fields.refs.newPassword.refs.newPassword.value();
        const newPasswordRepeat =
          this.refs.fields.refs.newPasswordRepeat.refs.newPasswordRepeat.value();
        if (oldPassword && newPassword && newPasswordRepeat) {
          console.log({ oldPassword, newPassword });
        }
      },
      passwordEditFields: [
        {
          title: "Старый пароль",
          type: "edit",
          inputType: "password",
          inputName: "oldPassword",
          value: "123456",
          validate: validatePassword,
          ref: "oldPassword",
        },
        {
          title: "Новый пароль",
          type: "edit",
          inputType: "password",
          inputName: "newPassword",
          value: "123456",
          validate: validatePassword,
          ref: "newPassword",
        },
        {
          title: "Повторите новый пароль",
          type: "edit",
          inputType: "password",
          inputName: "newPasswordRepeat",
          value: "123456",
          validate: validatePassword,
          ref: "newPasswordRepeat",
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
      {{{ InfoList items=passwordEditFields ref="fields" }}}
      <div class="profile_buttons">
        {{{ Button label="Сохранить" type="submit" onClick=onSubmit }}}
      </div>
      </form>
    </div>
  </div>
{{/layout}}
`;
  }
}

export { EditPasswordPage };
