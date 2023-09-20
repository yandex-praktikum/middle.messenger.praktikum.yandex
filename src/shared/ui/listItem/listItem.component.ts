import { Component } from "@/shared/model";
import { ListItemProps } from "./listItem.types";
import styles from "./listItem.module.css";

class ListItem extends Component {
  constructor(props: ListItemProps) {
    super(props);
  }

  protected render(): string {
    const { type, value } = this.props;

    if (type === "info") {
      let itemValue = "";
      if (value) {
        itemValue = `
          <span class="list-item_value">${value}</span>
        `;
      }
      return `
        <li class="${styles.listItem} listItem__${type}">
          <span class="list-item_title">
            {{{title}}}
          </span>
          ${itemValue}
        </li>
      `;
    } else if (type === "edit") {
      return `
        <li class="${styles.listItem} listItem__${type}">
          <label for="{{inputName}}" class="list-item_title">{{title}}</label>
          <input
            type="{{inputType}}"
            name="{{inputName}}"
            id="{{inputName}}"
            value="${value}"
            class="list-item_value"
          />
        </li>
      `;
    }

    return "";
  }
}

export { ListItem };
