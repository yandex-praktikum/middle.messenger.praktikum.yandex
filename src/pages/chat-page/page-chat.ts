import Block from "../../utils/Block.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";
import {mockListChats} from "../../mocks/chat.mocks.ts";
import {mockListMessages} from "../../mocks/chat-message.mocks.ts";

export class PageChat extends Block {
    constructor() {
        super({
            currentUser:mockUser,
            chatList:mockListChats,
            messageList:mockListMessages,
        });
    }

    protected render(): string {
        return (`
           <div class="chat-page">
                <div class="chat-page__left">
                    {{{ ChatList list=chatList }}}
                </div>
                <div class="chat-page__main">
                    {{{ MessageList messageList=messageList currentUser=currentUser }}}
                </div>
            </div>
        `)
    }
}
