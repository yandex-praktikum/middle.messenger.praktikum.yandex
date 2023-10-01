import HandleBars from "handlebars";
import {content} from "./tmpl/content.tmpl.ts";
import {Logo} from "../../components/logo";
import {Link} from "../../components/link";
import {Title} from "../../components/title";
import {Input, InputProps} from "../../components/input";
import {Button} from "../../components/button";

const signUpFieldList =
    [
        {
            placeholder: "first name",
            type: 'text'
        },
        {
            placeholder: 'second name',
            type: 'text'
        },
        {
            placeholder: 'login',
            type: 'text'
        },
        {
            placeholder: 'email',
            type: 'email'
        },
        {
            placeholder: 'phone',
            type: 'phone'
        },
        {
            placeholder: 'password(min.6 charact.)',
            type: 'password'
        },
        
    ] as InputProps

export const SignUpPage = () => {
   return HandleBars.compile(content)({
      logo: Logo(),
      signUpPageLink: Link({to: '/sign-in', content: 'or Sign In'}),
      title: Title({title: 'Let`s get started!'}),
       input: Input(signUpFieldList),
      button: Button({text: 'Create account'})
   });
}