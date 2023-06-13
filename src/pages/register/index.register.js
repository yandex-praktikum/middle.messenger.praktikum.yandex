import Handlebars from "handlebars";
import { template } from "./register.tmpl.js";

import data from "../../../public/data/data.js";
const profile = data.profile;
import { button } from "../../components/Button/index.button-comp.js";
const regButton = button({
  url: "/profile",
  text: "Create Account",
});

export const showRegister = () =>
  Handlebars.compile(template)({ profile, button: regButton });
