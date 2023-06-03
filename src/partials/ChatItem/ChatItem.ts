import { Block } from "../../core";

import { ChatProps } from "pages/Chat";

class ChatItem extends Block {
    static componentName = "ChatItem";

    constructor(props: ChatProps) {
        super(props);
    }

    protected render() {
        return `
            <li class="chat__item">
                <div class="chat__inner {{ mod }}">
                    <div class="chat__item-icon">

                    </div>
                    <div class="chat__item-text">
                        <span class="chat__item-name">
                            {{ name }}
                        </span>
                        <p class="chat__item-message">
                            {{ message }}
                        </p>
                    </div>
                    <div class="chat__item-info">
                        <span class="chat__item-time">
                            {{ time }}
                        </span>
                        <span class="chat__item-count">
                            {{ count }}
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

export default ChatItem;
