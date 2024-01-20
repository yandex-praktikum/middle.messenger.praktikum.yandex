import { Input } from '../../Components';
import { IChatMessage } from '../../Features/ChatMessage/ChatMessage';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import * as validators from '../../services/Validators';

export interface IChatDetail {
  messages?: IChatMessage[];
  title?: string;
  alt?: string;
  src?: string;
  validate?: {};
  sendMessage?: (event: ElementEvents['click']) => void;
}

type Refs = {
  message: Input;
};

export class ChatDetail extends Component<IChatDetail, Refs> {
  constructor(props: IChatDetail = {}) {
    const { messages = [], title = '', alt = '', src = '', ...restProps } = props;
    super({
      ...restProps,
      messages,
      title,
      alt,
      src,
      validate: {
        message: validators.message,
      },
      sendMessage: (event: ElementEvents['click']) => {
        event.preventDefault();

        this.refs.message.validate();
        const message = this.refs.message.value();

        console.log({ message });
      },
    });
  }

  render() {
    return `
    <div class="chatDetail">
      <div class="chatDetail_header">
        <div class="chatDetail_img">
          {{{ Avatar src=src alt=alt }}}
        </div>
        <div class="chatDetail_title">
          {{{ Text weight='700' type='primary' size='medium' text=title }}}
        </div>
        <div class="chatDetail_actions">
          {{> DotsInColumn}}
        </div>
      </div>
      <div class="chatDetail_body">
        <ul class="chatDetail_list">
          {{#each messages}}
            <li>
            {{{ ChatMessage 
                sender=this.sender
                type=this.type 
                message=this.message 
                readed=this.readed
                created_time=this.created_time 
            }}}
            </li>
          {{/each}}
        </ul>
      </div>
      <div class="chatDetail_footer">
        {{> Clip }}
        <form class="chatDetail_form">
          {{{ Input ref='message' validate=validate.message placeholder='Сообщение' id='message' name='message' }}}
        </form>
        {{{ Button type='primary' shape='circle' label='→' onClick=sendMessage }}}
      </div>
    </div>
    `;
  }
}
