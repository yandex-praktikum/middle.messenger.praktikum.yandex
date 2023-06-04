import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

import FormButton from "../components/FormButton";

import chatsControllers from "../controllers/chatsControllers";

import setWindowToggle from "../utils/setWindowToggle";

class DeleteChat extends Block {
    constructor() {

        const formButtons = [
            new FormButton({
                text: "Удалить",
                events: {
                    click: (e: Event) => {
                        e.preventDefault();

                        const chatId = Store.getState().currentChat.id;

                        chatsControllers.deleteChatById({ chatId });

                        setWindowToggle("chat__deleteChat");
                    },
                },
            }),
            new FormButton({
                text: "Отменить",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__deleteChat");
                    },
                },
            }),
        ];

        super({ formButtons });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <div class="chat__window chat__deleteChat close">
                <form class="chat__window-form chat__deleteChat-form">
                    <div class="chat__deleteChat-formButtons">
                        {{#each formButtons}}
                            {{{this}}}
                        {{/each}}
                    </div>
                <form>
            </div>
        `, { ...this.props });
    };
};

export default DeleteChat;
