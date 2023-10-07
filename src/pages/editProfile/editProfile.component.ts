import { Component } from "@/shared/model";
import styles from "./editProfilePage.module.css";
import profileStyles from "@/pages/profile/profilePage.module.css";
import { EditProfilePageProps } from "./editProfilePage.types";
import { connect } from "@/shared/model/store/connect";
import { UserAPI } from "@/shared/api/user";

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
          const userAPI = new UserAPI();
          userAPI.editUser({
            first_name: firstName,
            last_name: lastName,
            login: login,
            email: email,
            display_name: displayName,
            phone: phone,
          });
        }
      },
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
            {{{ SettingsList user=user ref="fields" }}}
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

const EditProfilePageWithStore = connect(({ user }) => ({ user }))(
  EditProfilePage,
);
export { EditProfilePageWithStore };
