import { Component } from "@/shared/model";
import styles from "./editProfilePage.module.css";
import profileStyles from "@/pages/profile/profilePage.module.css";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from "@/shared/lib";
import { EditProfilePageProps } from "./editProfilePage.types";

class EditProfilePage extends Component {
  constructor(props: EditProfilePageProps) {
    super({
      ...props,
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const firstName =
          this.refs.fields.refs.firstName.refs.firstName.value();
        const lastName = this.refs.fields.refs.lastName.refs.lastName.value();
        const login = this.refs.fields.refs.login.refs.login.value();
        const email = this.refs.fields.refs.email.refs.email.value();
        const displayName =
          this.refs.fields.refs.displayName.refs.displayName.value();
        const phone = this.refs.fields.refs.phone.refs.phone.value();

        if (firstName && lastName && login && email && displayName && phone) {
          console.log({
            firstName,
            lastName,
            login,
            email,
            displayName,
            phone,
          });
        }
      },
      userEditFields: [
        {
          title: "Почта",
          type: "edit",
          inputName: "email",
          value: "mail@yandex.ru",
          validate: validateEmail,
          ref: "email",
        },
        {
          title: "Логин",
          type: "edit",
          inputName: "login",
          value: "ivanovivan",
          validate: validateLogin,
          ref: "login",
        },
        {
          title: "Имя",
          type: "edit",
          inputName: "first_name",
          value: "Иван",
          validate: validateName,
          ref: "firstName",
        },
        {
          title: "Фамилия",
          type: "edit",
          inputName: "second_name",
          value: "Иванов",
          validate: validateName,
          ref: "lastName",
        },
        {
          title: "Имя в чате",
          type: "edit",
          inputName: "display_name",
          value: "Ivan",
          validate: validateLogin,
          ref: "displayName",
        },
        {
          title: "Телефон",
          type: "edit",
          inputName: "phone",
          value: "+7 (909) 123 45 67",
          validate: validatePhone,
          ref: "phone",
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
      {{{ InfoList items=userEditFields ref="fields" }}}
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

export { EditProfilePage };
