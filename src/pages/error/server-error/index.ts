import HandleBars from "handlebars";
import {description} from "./tmpl/description.ts";

export const ServerErrorPage = () => {
   return HandleBars.compile(description)({});
}