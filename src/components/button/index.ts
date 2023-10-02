import HandleBars from "handlebars";
import {button} from "./button.tmpl.ts";

type ButtonProps = {
    text: string;
}
export const Button = (props: ButtonProps) => {
    return HandleBars.compile(button)(props)
}
