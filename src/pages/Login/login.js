import Handlebars from "handlebars";
import login from "./login.hbs?raw";
import "./login.scss";

export const Login = (props = {}) => {
  return Handlebars.compile(login)(props);
};
