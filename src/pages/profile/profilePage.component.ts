import { Component } from "@/shared/model";
import styles from "./profilePage.module.css";
import { ProfilePageProps } from "./profilePage.types";
import { AuthController } from "@/widgets/auth/api";
import { connect } from "@/shared/model/store/connect";
import { UserAPI } from "@/shared/api/user";

class ProfilePage extends Component {
  constructor(props: ProfilePageProps) {
    const authController = new AuthController();
    const userAPI = new UserAPI();
    super({
      ...props,
      handleExitClick: () => {
        authController.logout();
      },
      handleEditAvatarClick: () => {
        const data = new FormData();
        data.append("avatar", this.refs.avatar.refs.input.element.files[0]);
        userAPI.editAvatar(data);
      },
    });
  }
  protected render() {
    let avatarSrc = "";
    if (this.props.user?.avatar !== null) {
      avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${this.props.user.avatar}"`;
    }
    return `
      {{#> layout}}
        <div class="${styles.profilePage}">
          <div>
            {{{ SideButton to="/messenger" }}}
          </div>
          <div class="${styles.profile}">
            {{{ UserImage ${avatarSrc} }}}
            {{{ InputField type="file" label="" ref="avatar" name="avatar" }}}
            {{{ Button label="Изменить аватар" onClick=handleEditAvatarClick }}}
            <div class="${styles.username}">
              Данные пользователя:
            </div>
              {{{ ProfileList user=user }}}
              {{{ Link to="/settings" label="Редактировать данные" }}}
              {{{ Button label="Выйти" onClick=handleExitClick }}}
          </div>
        </div>
      {{/layout}}
    `;
  }
}

const ProfilePageWithStore = connect(({ user }) => ({ user }))(ProfilePage);
export { ProfilePageWithStore };
