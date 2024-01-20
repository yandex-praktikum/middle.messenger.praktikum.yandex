import Component from '../../services/Component';

interface IProps {
  count?: number;
}

export class Badge extends Component<IProps> {
  constructor(props: IProps) {
    const { count = 0, ...restProps } = props;
    super({ count, ...restProps });
  }

  protected render(): string {
    const { count } = this.props;
    return `
      <div class='badge'>
        ${count}
      </div>
    `;
  }
}
