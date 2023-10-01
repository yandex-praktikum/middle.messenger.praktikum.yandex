import HandleBars from 'handlebars';

import { Link } from "../../components/link"
import {Title} from "../../components/title";
import {Header} from "../../components/header";
import {content} from "./tmpl/content.tmpl.ts";
import {Input} from "../../components/input";

const people = {
    people: [
        "Login ",
        "Password ",
    ]
}
export const AuthPage = () => {
    return HandleBars.compile(content)({
        header: Header(),
        regPageLink: Link({to: '/reg', text: 'or Sign Up'}),
        title: Title({title: 'Log In'}),
        input: Input({props : people})
    });
}
