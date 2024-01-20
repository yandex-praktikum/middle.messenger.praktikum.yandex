import Component from '../../services/Component';

export interface IChatMessage {
  sender?: 'me' | 'default';
  type?: 'medial' | 'default';
  message?: string;
  created_time: string;
  readed?: boolean;
}

export class ChatMessage extends Component<IChatMessage> {
  constructor(props: IChatMessage) {
    const { sender = 'default', type = 'default', message = '', readed = false, ...restProps } = props;

    super({
      ...restProps,
      sender,
      type,
      message,
      readed,
    });
  }

  render() {
    const { sender, type, message, created_time } = this.props;

    return `
      <div class="chatMessage" data-sender="${sender}" data-type="${type}">
        <div class="chatMessage_text">
            {{{ Text type='primary' size='small' weight='500' text='${message}' }}}
        </div>
        <div class="chatMessage_time">
            {{{ Text type='primary' size='small' weight='500' text='${created_time}' }}}
        </div>
        {{#if readed}}
          <div class="chatMessage_status">
              {{> MessageReaded }}
          </div>
        {{/if}}
      </div>
    `;
  }
}
