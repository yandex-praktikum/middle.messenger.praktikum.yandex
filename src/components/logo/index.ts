import HandleBars from "handlebars";
import { logo } from "./logo.tmpl.ts";


export const Logo = () => {
    return HandleBars.compile(logo)({});
}