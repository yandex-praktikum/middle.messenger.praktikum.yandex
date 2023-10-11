import { Component } from "@/shared/model";
import { UserImageProps } from "./userImage.types";
import noImage from "@/assets/no-image.svg";
import styles from "./userImage.module.css";

class UserImage extends Component {
  constructor(props: UserImageProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  protected render() {
    const { src, isSmall } = this.props;

    let image = `
      <img src="${noImage}" alt="Изображение пользователя" />
    `;

    if (src) {
      image = `
        <img src="${src}" alt="Изображение пользователя" />
      `;
    }

    return `
      <div class="${
        isSmall
          ? [styles.userImage, styles.userImageSmall].join(" ")
          : styles.userImage
      }">
        ${image}
      </div>
    `;
  }
}

export { UserImage };
