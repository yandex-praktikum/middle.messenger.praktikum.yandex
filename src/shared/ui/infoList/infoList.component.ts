import { Component } from "@/shared/model";
import { InfoListProps } from "./infoList.types";
import styles from "./infoList.module.css";

class InfoList extends Component {
  constructor(props: InfoListProps) {
    super(props);
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

export { InfoList };
