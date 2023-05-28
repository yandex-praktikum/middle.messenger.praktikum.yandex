import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

import FormButton from "../components/FormButton";

import chatsControllers from "../controllers/chatsControllers";

import setWindowToggle from "../utils/setWindowToggle";

class AddChatImage extends Block {
    constructor() {

        const formButtons = [
            new FormButton({
                text: "Сохранить",
                events: {
                    click: (e: Event) => {
                        e.preventDefault();

                        const err = document.querySelector(".chat__addChatImage-error") as HTMLElement;
                        err.textContent = "";

                        const permittedFileTypes = ["jpg", "jpeg", "png"];
                        const file = document.querySelector(".chat__addChatImage-file") as any;

                        if (!file || !file.files.length) return;

                        const fileName = file.files[0].name.toLowerCase();
                        const isFileTypeOk = permittedFileTypes.some(type => fileName.endsWith(type));

                        if (!isFileTypeOk) {
                            err.textContent = "Допустимы только файлы jpg, jpeg или png";
                            return;
                        }

                        const chatId = Store.getState().currentChat.id;
                        const formData = new FormData();
                        formData.append("avatar", file.files[0]);
                        formData.append("chatId", chatId);

                        chatsControllers.changeChatAvatar(formData);

                        setWindowToggle("chat__addChatImage");
                    },
                },
            }),
            new FormButton({
                text: "Отменить",
                events: {
                    click: (e) => {
                        e.preventDefault();

                        setWindowToggle("chat__addChatImage");
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
            <div class="chat__window chat__addChatImage close">
                <form class="chat__window-form">
                    <span class="chat__addChatImage-title">
                        Добавить аватар чату
                    </span>
                    <input class="chat__addChatImage-file" type="file" name="chat-image" accept="image/*">
                    <span class="chat__addChatImage-error">
                            
                    </span>
                    <div class="chat__addChatImage-formButtons">
                        {{#each formButtons}}
                            {{{this}}}
                        {{/each}}
                    </div>
                <form>
            </div>
        `, { ...this.props });
    };
};

export default AddChatImage;
