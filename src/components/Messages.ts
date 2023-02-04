import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

class Messages extends Block {
    constructor() {
        super();

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="chat__content">
                <ul class="chat__content-list">
                    {{#each messages}}
                        {{#if this.my}}
                            <li class="chat__content-item my-message">
                                <p class="chat__content-text">
                                    {{content}}
                                </p>
                                <p class="chat__content-time">
                                    {{time}}
                                </p>
                            </li>
                            {{else}}
                                <li class="chat__content-item">
                                    <p class="chat__content-time">
                                        {{time}}
                                    </p>
                                    <p class="chat__content-text">
                                        {{content}}
                                    </p>
                                </li>
                        {{/if}}
                    {{/each}}
                </ul>
            </div>
        `, { ...this.props });
    };
};

export default Messages;
