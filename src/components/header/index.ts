import HandleBars from "handlebars";
import {header} from "./header.tmpl.ts";


export const Header = () => {
    return HandleBars.compile(header)({});
}