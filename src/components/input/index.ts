import HandleBars from "handlebars";
import {input} from "./input.tmpl.ts";


export const Input = (props: unknown) => {
    return HandleBars.compile(input)(props);
}