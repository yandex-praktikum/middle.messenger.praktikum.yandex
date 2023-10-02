import HandleBars from 'handlebars';

import { Link } from "../../components/link"
import {Title} from "../../components/title";
import {Logo} from "../../components/logo";
import {content} from "./tmpl/content.tmpl.ts";
import {Input, InputProps} from "../../components/input";
import {Button} from "../../components/button";

const signInFieldList =
    [
        {
            placeholder: 'login',
            type: 'text'
        },
        {
            placeholder: 'password',
            type: 'password'
        },
       
    ] as InputProps
export const SignInPage = () => {
    return HandleBars.compile(content)({
        logo: Logo(),
        signUpPageLink: Link({to: '/sign-up', content: 'or Sign Up'}),
        title: Title({title: 'Log In'}),
        input: Input(signInFieldList),
        button: Button({text: 'Enter'})
    });
}
