import HandleBars from 'handlebars';
import { form } from "./tmpl/form.tmpl.ts";
import { Link } from "../../components/link"

export const AuthPage = () => {
    return HandleBars.compile(form)({
        regPageLink: Link({to: '/reg', text: 'Sign Up'})
    });
}
