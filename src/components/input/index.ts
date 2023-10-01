import HandleBars from "handlebars";
import {input} from "./input.tmpl.ts";

export type InputProps = {
    placeholder?: string;
    type?: string;
}
export const Input = (props: InputProps) => {
    console.log(props)
    return HandleBars.compile(input)(props);
}