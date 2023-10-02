import HandleBars from "handlebars";
import { link } from "./link.tmpl.ts";

type LinkProps = {
    to: string;
    content: string;
}
export const Link = (props: LinkProps ) => {
    return HandleBars.compile(link)(props);
}
