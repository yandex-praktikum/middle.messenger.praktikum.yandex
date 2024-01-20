import Component from '../../services/Component';

interface IProps {}

export class Modal extends Component<IProps> {
  constructor(props: IProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="modal_root">
        <div class="modal_container">
            {{> @partial-block }}
        </div>
      </div>
    `;
  }
}
