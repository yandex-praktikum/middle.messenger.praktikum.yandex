import HandleBars from "handlebars";
import {block} from "./tmpl/block.tmpl.ts";


export const ChatPage = () => {
    return HandleBars.compile(block)({});
}