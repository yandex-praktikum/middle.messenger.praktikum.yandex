import Handlebars from "handlebars";
import { template } from "./error.tmpl.js";

const code_500 = "500";
const text_500 = "Мы уже работаем на решением данной проблемы";

const code_404 = "404";
const text_404 = "OOPS, вы не туда попали";

export const error_500 = () =>
    Handlebars.compile(template)({ code: code_500, text: text_500 });

export const error_404 = () =>
    Handlebars.compile(template)({ code: code_404, text: text_404 });

export const showError = (code = 404) => {
    if(code === 500) {
        return error_500();
    }   else {
        return error_404();
    }
};
