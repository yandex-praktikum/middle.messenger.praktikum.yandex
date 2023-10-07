import { Component } from "@/shared/model";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from "@/shared/lib";
import { SettingsListProps } from "./settingsList.types";
import styles from "@/shared/ui/infoList/infoList.module.css";

class SettingsList extends Component {
  constructor(props: SettingsListProps) {
    super({
      ...props,
      items: [
        {
          title: "Почта",
          type: "edit",
          inputName: "email",
          value: props.user?.email,
          validate: validateEmail,
          ref: "email",
        },
        {
          title: "Логин",
          type: "edit",
          inputName: "login",
          value: props.user?.login,
          validate: validateLogin,
          ref: "login",
        },
        {
          title: "Имя",
          type: "edit",
          inputName: "first_name",
          value: props.user?.first_name,
          validate: validateName,
          ref: "firstName",
        },
        {
          title: "Фамилия",
          type: "edit",
          inputName: "second_name",
          value: props.user?.second_name,
          validate: validateName,
          ref: "lastName",
        },
        {
          title: "Имя в чате",
          type: "edit",
          inputName: "display_name",
          value: props.user?.display_name,
          validate: validateLogin,
          ref: "displayName",
        },
        {
          title: "Телефон",
          type: "edit",
          inputName: "phone",
          value: props.user?.phone,
          validate: validatePhone,
          ref: "phone",
        },
      ],
    });
  }

  protected render() {
    return `
      <div class="${styles.infoList}">
        <ul>
          {{#each items}}
            {{{ListItem type=type title=title value=value inputType=inputType inputName=inputName validate=validate ref=ref}}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}

export { SettingsList };
