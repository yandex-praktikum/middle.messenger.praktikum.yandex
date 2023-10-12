import { Component } from "@/shared/model";
import { LinkProps } from "./link.types";
import styles from "./link.module.css";

class Link extends Component {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          if (props.to) {
            window.router.go(props.to);
          }
        },
      },
    });
  }

  protected render() {
    const { to, label } = this.props;
    return `
      <a href="${to}" class="${styles.link}">
        ${label}
      </a>
    `;
  }
}

export { Link };
