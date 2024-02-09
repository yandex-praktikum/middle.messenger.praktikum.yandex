import Handlebars from "handlebars";
import { template } from "./auth.tmpl.js";
import { button } from "../../components/Button/buttons.js";
import { input } from "../../components/Input/input.js";

const title = "Вход";
const authButton = button({
    url: "/messages",
    text: "Авторизация",
});
const inp = input({
    text: "Логин",
    type: "text",
    name: "login",
    placeholder: "ivanivavov",
})

const inp2 = input({
    text: "Пароль",
    type: "password",
    name: "password",
    placeholder: "***********",
})

export const showAuth = () =>
    Handlebars.compile(template)({ button: authButton, title, inp, inp2 });
