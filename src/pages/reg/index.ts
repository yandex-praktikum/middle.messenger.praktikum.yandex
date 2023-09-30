import HandleBars from "handlebars";
import {form} from "./tmpl/form.tmpl.ts";

export const RegPage = () => {
   return HandleBars.compile(form)({});
}