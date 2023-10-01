import HandleBars from "handlebars";
import {content} from "./tmpl/content.tmpl.ts";
import {Link} from "../../../components/link";

export const  NotFoundPage = () => {
   return HandleBars.compile(content)({
      chatPageLink: Link({
         to: '/chats',
         content: 'назад к чатам'
      })
   });
}