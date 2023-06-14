import Handlebars from "handlebars";
import { template } from "./profileEdit.tmpl.js";
import data from "../../../public/data/data.js";
import { buttonAwesome } from "../../components/Button/index.button-comp.js";
import { button } from "../../components/Button/index.button-comp.js";
const profile = data.profile;
const saveButton = button({
  url: "/profile",
  text: "Save",
});
const buttons = {
  back: buttonAwesome({
    icon: "fa-solid fa-angle-left",
    title: "Back",
    url: "/profile",
    cl: "back-button",
  }),
  settings: buttonAwesome({
    icon: "fa-solid fa-bars",
    title: "Settings",
    url: "",
    cl: "settings-button",
  }),
};

export const showProfileEdit = () =>
  Handlebars.compile(template)({ profile, saveButton, buttons });
