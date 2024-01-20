import Component from '../../services/Component';

interface IProps {
  pages?: {
    page: string;
    onClick: (page: string) => void;
  }[];
}

export class _Nav extends Component<IProps> {
  constructor(props: IProps) {
    const { pages = [], ...restProps } = props;

    super({
      ...restProps,
      pages,
    });
  }

  protected render(): string {
    return `
      <nav>
          <ul class="people_list">
              {{#each pages}}
                {{{ Button type='text' shape='default' label=this.page onClick=this.onClick }}}
              {{/each}}
          </ul>
      </nav>
    `;
  }
}
