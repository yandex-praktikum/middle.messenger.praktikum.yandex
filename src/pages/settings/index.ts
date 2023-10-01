import HandleBars from "handlebars";
import {settings} from "./tmpl/settings.tmpl.ts";
import {Logo} from "../../components/logo";
import {Link} from "../../components/link";
import {Button} from "../../components/button";
import {Input} from "../../components/input";

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
export const SettingsPage = () => {
    return HandleBars.compile(settings)({
        logo: Logo(),
        authPageLink: Link({to: '/auth', content: 'or Sign In'}),
        button: Button({text: 'Save'}),
        input: Input({props : regFieldList}),
    })
}