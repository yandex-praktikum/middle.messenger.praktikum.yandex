import Handlebars from "handlebars";
import { template } from "./login.tmpl.js";
import { button } from "../../components/Button/index.button-comp.js";
const loginButton = button({
  url: "/messages",
  text: "Log in",
});
export const showLogin = () =>
  Handlebars.compile(template)({ button: loginButton });
