import Handlebars from "handlebars";
import { template } from "./profile.tmpl.js";
import { button_blue } from "../../components/Button/buttons.js";
import {svg_arrow_right, svg_send} from "../../components/Svg/svg.js";

const name = "Дмитрий";

export const label = ({text, url}) => Handlebars.compile(`
<button class="button button__blue"  onclick="window.location.href ='{{ url }}'">{{ text }}</button>`)({text, url})

const params = [
    {name: "Почта", value: "pochta@yandex.ru"},
    {name: "Логин", value: "ivanivanov"},
    {name: "Имя", value: "Иван"},
    {name: "Фамилия", value: "Иванов"},
    {name: "Имя в чате", value: "Иван"},
    {name: "Телефон", value: "+7 (909) 967 30 30"},
];
export const showProfile = () =>
    Handlebars.compile(template)({ params,name, svg_send: svg_send(28,28) });