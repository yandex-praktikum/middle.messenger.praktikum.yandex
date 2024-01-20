import Component from '../../services/Component';

interface IProps {
  src?: string;
  alt?: string;
}

export class Avatar extends Component<IProps> {
  constructor(props: IProps) {
    super({ ...props });
  }

  protected render(): string {
    const { src = '', alt = '' } = this.props;

    const image = `<img src="${src}" alt="${alt}" />`;
    const empty = `{{> EmptyAvatar}}`;
    return `
      <div class="avatar">
        ${src ? image : empty}
      </div>
    `;
  }
}
