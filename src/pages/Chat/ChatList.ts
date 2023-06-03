import { Block } from "../../core";

import { ChatData } from ".";

class ChatList extends Block {
    static componentName = "ChatList";

    constructor() {
        super();

        this.setProps({
            data: ChatData,
        });
    }

    protected render() {
        return `
            <div class="chat">
                <div class="chat__sidebar">
                    {{{ ChatHolder }}}
                    <ul class="chat__list">
                        {{#each this.data }}
                            {{{ ChatItem mod=this.mod name=this.name message=this.message time=this.time count=this.count }}}
                        {{/each }}
                    </ul>
                </div>
                <div class="chat__view">
                    <div class="chat__wrapper">
                        Выберите чат чтобы отправить сообщение
                    </div>
                </div>
            </div>
        `;
    }
}

export default ChatList;
