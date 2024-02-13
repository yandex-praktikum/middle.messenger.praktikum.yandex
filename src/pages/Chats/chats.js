import Handlebars from "handlebars";
import chats from "./chats.hbs?raw";
import "./chats.scss";

export const chatsTemplate = (props = {}) => {
  return Handlebars.compile(chats)(props);
};
