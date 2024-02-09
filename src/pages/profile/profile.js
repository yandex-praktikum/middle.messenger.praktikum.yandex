import Handlebars from "handlebars";
import { template } from "./profile.tmpl.js";
import { template_edit } from "./profile_edit.tmpl.js";
import { template_edit_password } from "./profile_edit_password.tmpl.js";
import {button_blue, button, button_blue_static} from "../../components/Button/buttons.js";
import {svg_arrow_right, svg_send} from "../../components/Svg/svg.js";

const name = "Дмитрий";

export const label = ({text, url}) => Handlebars.compile(`
<button class="button button__blue"  onclick="window.location.href ='{{ url }}'">{{ text }}</button>`)({text, url})

const params = [
    {name: "Почта", value: "pochta@yandex.ru", value_name: "email"},
    {name: "Логин", value: "ivanivanov", value_name: "login"},
    {name: "Имя", value: "Иван", value_name: "first_name"},
    {name: "Фамилия", value: "Иванов", value_name: "second_name"},
    {name: "Имя в чате", value: "Иван", value_name: "display_name"},
    {name: "Телефон", value: "+7 (909) 967 30 30", value_name: "phone"},
];

const params_password = [
    {name: "Старый пароль", value: "", placeholder: "*******", value_name: "oldPassword"},
    {name: "Новый пароль", value: "", placeholder: "*********", value_name: "newPassword"},
    {name: "Повторите новый пароль", value: "", placeholder: "*********", value_name: "newPassword_2"},
];

const saveButton = button_blue_static({
    url: "/profile",
    text: "Сохранить",
});

export const showProfile = (edit = "") => {
    if(edit === "edit") {
        return Handlebars.compile(template_edit)({saveButton, params,name, svg_send: svg_send(28,28) });
    }   else if(edit === "password") {
        return Handlebars.compile(template_edit_password)({saveButton, params: params_password,name, svg_send: svg_send(28,28) });
    }   else {
        return Handlebars.compile(template)({ params,name, svg_send: svg_send(28,28) });
    }
}

