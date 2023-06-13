import { showLogin } from "./src/pages/login/index.login.js";
import { showProfile } from "./src/pages/profile/index.profile.js";
import { showRegister } from "./src/pages/register/index.register.js";
import { showMessages } from "./src/pages/messages/index.messages.js";
import { showProfileEdit } from "./src/pages/profileEdit/index.edit.js";
import { showError } from "./src/pages/error/index.error.js";
import data from "./public/data/data.js";
const { chats, profile } = data;
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  root.innerHTML = "";
  const loc = window.location.pathname;
  const loadPage = (path) => {
    if (path === "/" || path === "") {
      window.location.href = "/login";
    } else if (path === "/login") {
      return showLogin();
    } else if (path === "/profile") {
      return showProfile(profile);
    } else if (path === "/register") {
      return showRegister();
    } else if (path ==="/messages") {
      return showMessages(chats);
    } else if (path === "/profile-edit") {
      return showProfileEdit(profile);
    } else {
      const names = chats.map((chat) => chat.display_name)
      const name = path.split("/")[1];
      if(names.includes(name)){
        return showMessages(chats, profile, name);
      }
      return showError();
    }
  };
  root.innerHTML = loadPage(loc);
});
