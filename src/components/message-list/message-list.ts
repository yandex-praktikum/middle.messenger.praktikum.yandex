import {IProps,Block} from "../../utils/Block";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {IUser} from "../../models/IUser.ts";
import { Message} from "../index.ts";
import {IMessageProps} from "../message/message.ts";

interface IMessageListProps extends IProps{
    messageList:IChatMessage[];
    currentUser:IUser
}

export class MessageList extends Block {
    constructor(props: IMessageListProps) {
        super(props);
    }
    public get props(){
        return this._props as IMessageListProps;
    }
    getListMessages(list:IChatMessage[]):string{
        if(!list||list.length===0)return '';
        return list.map(message=>{
            const messageBlock=new Message({message:message,myMessage:message.main||false} as IMessageProps)
            return(`
            <div class="message-list__main__message">
                ${messageBlock.renderForList()}
                </div>
            `)
        }).join('')
    }
    protected render(): string {
        const { messageList,currentUser } = this.props;
        const {avatar,display_name}=currentUser;
        return (`
           <div class="message-list">
                <div class="message-list__header">
                    <div class="message-list__header__avatar">
                        {{{ Avatar image=${avatar} size='sm'}}}
                        <span>${display_name}</span>
                    </div>
                    {{{ Button type="dots"}}}
                </div>
                <ul class="message-list__main">
                    ${this.getListMessages(messageList)}                   
                </ul>
                <div class="message-list__footer">
                    {{{ Button type="paperclip"}}}
                    <input
                            class="message-list__footer__input"
                            placeholder="Message"
                            name="message"
                            type="text"
                    />
                    {{{ Button type="arrow"}}}
                </div>
            </div>
        `)
    }
}
