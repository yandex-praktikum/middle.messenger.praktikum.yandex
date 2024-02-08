import Handlebars from "handlebars";
import { template } from "./register.tmpl.js";
import { button_blue } from "../../components/Button/buttons.js";
import { input } from "../../components/Input/input.js";


const title = "Регистрация";
const registerButton = button_blue({
    url: "/messages",
    text: "Зарегистрироваться",
});
const inp_login = input({
    text: "Логин",
    type: "text",
    name: "login",
    placeholder: "ivanivavov",
})

const inp_email = input({
    text: "Почта",
    type: "text",
    name: "email",
    placeholder: "ivanivavov@gmail.com",
})

const inp_name = input({
    text: "Имя",
    type: "text",
    name: "first_name",
    placeholder: "Ivan",
})

const inp_last_name = input({
    text: "Фамилия",
    type: "text",
    name: "second_name",
    placeholder: "Ivanov",
})

const inp_phone = input({
    text: "Телефон",
    type: "tel",
    name: "phone",
    placeholder: "+7 (909) 967 30 30",
})

const inp_password = input({
    text: "Пароль",
    type: "password",
    name: "password",
    placeholder: "***************",
})

const inp_password_2 = input({
    text: "Пароль (ещё раз)",
    type: "password",
    name: "password_2",
    placeholder: "***************",
})

const inputs = [inp_email, inp_login, inp_name,  inp_last_name,inp_phone,  inp_password, inp_password_2];

export const showRegister = () =>
    Handlebars.compile(template)({ button: registerButton, title, inputs });
