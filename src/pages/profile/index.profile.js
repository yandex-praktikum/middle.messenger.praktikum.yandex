import Handlebars from "handlebars";
import { template } from "./profile.tmpl.js";
import data from "../../../public/data/data.js";
import { buttonAwesome } from "../../components/Button/index.button-comp.js";

const profileData = data.profile;
const avatar = profileData.avatar;
const userDetails = [
  { label: "Name", value: profileData.first_name },
  { label: "Last Name", value: profileData.second_name },
  { label: "Email Address", value: profileData.login },
  { label: "Phone Number", value: profileData.phone },
  { label: "Age", value: profileData.age },
  { label: "City", value: profileData.city },
];
const buttons = {
  back: buttonAwesome({
    icon: "fa-solid fa-angle-left",
    title: "Back",
    url: "/messages",
    cl: "back-button",
  }),
  settings: buttonAwesome({
    icon: "fa-solid fa-bars",
    title: "Settings",
    url: "",
    cl: "settings-button",
  }),
};

export const showProfile = () =>
  Handlebars.compile(template)({ avatar, detail: userDetails, buttons });
