import HandleBars from 'handlebars';

import { Link } from "../../components/link"
import {Title} from "../../components/title";
import {Logo} from "../../components/logo";
import {content} from "./tmpl/content.tmpl.ts";
import {Input} from "../../components/input";
import {Button} from "../../components/button";

const authFieldList = {
    people: [
        "Login ",
        "Password ",
    ]
}
export const AuthPage = () => {
    return HandleBars.compile(content)({
        logo: Logo(),
        regPageLink: Link({to: '/reg', content: 'or Sign Up'}),
        title: Title({title: 'Log In'}),
        input: Input({props : authFieldList}),
        button: Button({text: 'Enter'})
    });
}
