import { Component } from "@/shared/model";
import { EditChatModalProps } from "./editChatModal.types";

class EditChatModal extends Component {
  constructor(props: EditChatModalProps) {
    super(props);
  }

  render() {
    return `
      {{#> Modal }}
        123
      {{/ Modal }}
    `;
  }
}

export { EditChatModal };
