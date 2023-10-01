import HandleBars from "handlebars";
import {content} from "./tmpl/content.tmpl.ts";
import {Logo} from "../../components/logo";
import {Link} from "../../components/link";


export const ChatPage = () => {
    return HandleBars.compile(content)({
        logo: Logo(),
        linkToSettings: Link({
            to: '/settings',
            content: '<img class="settings-styled" src=\'/src/assets/settings.svg\' alt="settings"/>'
        }),
        linkToAuth: Link({
            to: '/auth',
            content: '<img class="arrow-exit" src=\'/src/assets/exit.svg\' alt="exit"/>'
        })
    });
}