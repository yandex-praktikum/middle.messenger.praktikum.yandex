import HandleBars from "handlebars";
import {title} from "./title.tmpl.ts";

type TitleProps =  {
    title: string | number,
}
export const Title = (props: TitleProps) => {
    return HandleBars.compile(title)({
        title: props.title
    })
}