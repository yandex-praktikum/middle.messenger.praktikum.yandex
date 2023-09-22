import { Component } from "@/shared/model";
import { IconButtonProps } from "./iconButton.types";
import styles from "./iconButton.module.css";

class IconButton extends Component {
  constructor(props: IconButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    const { src, type, customClass } = this.props;
    return `
<button class="${styles.iconButton} ${customClass}" type=${type}>
<img src=${src} />
</button>
`;
  }
}

export { IconButton };
