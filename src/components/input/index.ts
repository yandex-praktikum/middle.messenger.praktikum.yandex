import HandleBars from "handlebars";
import {input} from "./input.tmpl.ts";


type  InputParams = {
    props: unknown;
}

export const Input = ({props}: InputParams) => {
    console.log(props)
    return HandleBars.compile(input)(props);
}