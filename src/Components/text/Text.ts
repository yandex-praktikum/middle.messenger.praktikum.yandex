import Component from '../../services/Component';

interface IProps {
  type?: 'primary' | 'secondary';
  weight?: '300' | '500' | '700';
  ellipsis?: boolean;
  underline?: boolean;
  text: string;
  size?: 'small' | 'medium' | 'large';
}

export class Text extends Component<IProps> {
  constructor(props: IProps) {
    const {
      size = 'medium',
      weight = '500',
      type = 'primary',
      ellipsis = false,
      underline = false,
      ...restProps
    } = props;

    super({
      ...restProps,
      size,
      weight,
      type,
      ellipsis,
      underline,
    });
  }

  protected render(): string {
    const { type, weight, text, ellipsis, underline, size } = this.props;
    return `
    <span class='text text_${type} ${ellipsis ? 'ellipsis' : ''} ${underline ? 'underline' : ''}' data-size="${size}"
      data-weight="${weight}">
      ${text}
    </span>
    `;
  }
}
