import HandleBars from "handlebars";
import {content} from "./tmpl/content.tmpl.ts";
import {Link} from "../../../components/link";
import {Title} from "../../../components/title";

export const ServerErrorPage = () => {
   return HandleBars.compile(content)({
      title: Title({
         title: '500'
      }),
      chatPageLink: Link({
         to: '/chats',
         content: 'назад к чатам'
      })
   });
}
