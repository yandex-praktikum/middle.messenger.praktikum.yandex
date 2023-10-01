import HandleBars from "handlebars";
import {content} from "./tmpl/content.tmpl.ts";
import {Logo} from "../../components/logo";
import {Link} from "../../components/link";
import {Title} from "../../components/title";
import {Input} from "../../components/input";
import {Button} from "../../components/button";

const regFieldList = {
   people: [
      "first name ",
      "second name ",
       "login",
       "email",
       "phone",
       "password(min.6 charact.)"
   ]
}
export const RegPage = () => {
   return HandleBars.compile(content)({
      logo: Logo(),
      authPageLink: Link({to: '/auth', content: 'or Sign In'}),
      title: Title({title: 'Let`s get started!'}),
      input: Input({props : regFieldList}),
      button: Button({text: 'Create account'})
   });
}