import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

class AvatarBlock extends Block {
    constructor() {
        super();

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="profile__avatar-block">
                {{#if currentUser.avatar}}
                    <img class="profile__avatar-img" src="https://ya-praktikum.tech/api/v2/resources{{currentUser.avatar}}">   
                    {{else}}
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z"
                            fill="#CDCDCD" />
                    </svg>
                {{/if}}
            </div>
        `, { ...this.props });
    };
};

export default AvatarBlock;
