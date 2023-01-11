import { Block } from "../../core";

import { ChatData } from ".";

class Chat extends Block {
    static componentName = "Chat";

    private readonly ChatContent = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7,
        8, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ];

    constructor() {
        super();

        this.setProps({
            data: ChatData,
            content: this.ChatContent,
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
                    <div class="chat__head">
                        <div class="chat__wrapp chat__wrapp-up">
                            <div class="chat__upper">
                                <div class="chat__user-icon">

                                </div>
                                <span class="chat__user-name">
                                    Магомед
                                </span>
                            </div>
                            <button class="chat__user-settings">
                                <svg width="3" height="16" viewBox="0 0 3 16" fill="none">
                                    <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E" />
                                    <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E" />
                                    <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="chat__content">
                        {{#each this.content }}
                            <h1>CONTENT</h1>
                        {{/each }}
                    </div>
                    <div class="chat__foot">
                        <div class="chat__wrapp chat__wrapp-down">
                            <button class="chat__media">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6.18662 12.5L13.7628 4.92389L14.7056 5.8667L7.12943 13.4428L6.18662 12.5Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M8.70067 15.0141L16.2768 7.43793L17.2196 8.38074L9.64348 15.9569L8.70067 15.0141Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M14.0433 20.3567L21.6195 12.7806L22.5623 13.7234L14.9861 21.2995L14.0433 20.3567Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M16.5574 22.8708L24.1335 15.2946L25.0763 16.2374L17.5002 23.8136L16.5574 22.8708Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M16.5574 22.8709C13.9423 25.486 9.71181 25.4954 7.10831 22.8919C4.50482 20.2884 4.51424 16.0579 7.12936 13.4428L6.18655 12.5C3.0484 15.6381 3.0371 20.7148 6.16129 23.839C9.28549 26.9632 14.3621 26.9518 17.5003 23.8137L16.5574 22.8709Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M21.6195 12.7806L22.5623 13.7234C25.003 11.2826 25.0118 7.3341 22.5819 4.90417C20.152 2.47424 16.2035 2.48303 13.7627 4.92381L14.7055 5.86662C16.6233 3.94887 19.7257 3.94196 21.6349 5.85119C23.5441 7.76042 23.5372 10.8628 21.6195 12.7806Z"
                                        fill="#999999" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M8.70092 15.0144C6.95751 16.7578 6.95123 19.5782 8.68689 21.3138C10.4226 23.0495 13.2429 23.0432 14.9863 21.2998L14.0435 20.357C12.8231 21.5774 10.8489 21.5818 9.63391 20.3668C8.41894 19.1518 8.42334 17.1776 9.64373 15.9572L8.70092 15.0144Z"
                                        fill="#999999" />
                                </svg>
                            </button>
                            <input class="chat__message" type="text" name="message" placeholder="Сообщение">
                            <button class="chat__submit">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3" />
                                    <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white" />
                                    <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Chat;
