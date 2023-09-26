import { Block } from "../../core/index";
import template from "./ChatsAndChat.tmp.pug";
import {
  FieldText,
} from "../../components/index";

const fieldSearch = new FieldText({
  withId: true,
  mods: 'field-text--center field-text--white',
  type: 'text',
  name: 'search',
  value: '',
  placeholder: 'search',
})

const fieldMessage = new FieldText({
  withId: true,
  mods: 'field-text--main',
  type: 'text',
  name: 'message',
  value: '',
  placeholder: 'Type a message',
})

export default class ChatsAndChat extends Block {
  constructor(props?: object) {
    super('div', { ...props, fieldSearch, fieldMessage });
  }

  render() {
    return this.compile(template, this.props);
  }
}
