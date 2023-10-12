import { Component } from "@/shared/model";
import styles from "@/shared/ui/infoList/infoList.module.css";
import { ProfileListProps } from "./profileList.types";

class ProfileList extends Component {
  constructor(props: ProfileListProps) {
    super({
      ...props,
      items: [
        {
          title: "Почта",
          value: props.user?.email,
          type: "info",
        },
        {
          title: "Логин",
          value: props.user?.login,
          type: "info",
        },
        {
          title: "Имя",
          value: props.user?.first_name,
          type: "info",
        },
        {
          title: "Фамилия",
          value: props.user?.second_name,
          type: "info",
        },
        {
          title: "Имя в чате",
          value: props.user?.display_name,
          type: "info",
        },
        {
          title: "Телефон",
          value: props.user?.phone,
          type: "info",
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

export { ProfileList };
