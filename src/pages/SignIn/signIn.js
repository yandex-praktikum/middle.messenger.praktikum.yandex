import Handlebars from "handlebars";
import signIn from "./signIn.hbs?raw";
import "./signIn.scss";

export const signInTemplate = (props = {}) => {
  return Handlebars.compile(signIn)(props);
};
