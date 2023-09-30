import HandleBars from "handlebars";
import {description} from "./tmpl/description.tmpl.ts";

export const  NotFoundPage = () => {
   return HandleBars.compile(description)({});
}