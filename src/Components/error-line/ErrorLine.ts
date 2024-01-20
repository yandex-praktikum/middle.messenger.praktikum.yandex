import Component from '../../services/Component';

interface Props {
  error: string;
}
type Ref = {};

export class ErrorLine extends Component<Props, Ref> {
  protected render(): string {
    return `
            <div class="input__text-error {{#if error}}visible{{/if}}">{{error}}</div>
        `;
  }
}
