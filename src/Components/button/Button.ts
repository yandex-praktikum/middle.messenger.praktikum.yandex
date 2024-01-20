import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';

interface IProps {
  type?: 'primary' | 'text';
  shape?: 'circle' | 'default';
  danger?: boolean;
  label: string;
  onClick?: (event: ElementEvents['click']) => void;
  events: {
    click: IProps['onClick'];
  };
}

export class Button extends Component<IProps> {
  constructor(props: IProps) {
    const { onClick, danger = false, shape = 'default', type = 'primary', ...restProps } = props;

    const click = (event: ElementEvents['click']) => {
      if (onClick) {
        onClick(event);
      }
    };

    super({
      ...restProps,
      danger,
      shape,
      type,
      events: {
        click,
      },
    });
  }

  protected render(): string {
    const { type, label, shape, danger } = this.props;
    return `
      <button ref="button" class='button button__${type} button__${shape} ${danger ? 'danger' : ''}'>
        ${label}
      </button>
    `;
  }
}
