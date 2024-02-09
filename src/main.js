import {showAuth} from "./pages/auth/auth.js";
import {showRegister} from "./pages/register/register.js";
import {showMessages} from "./pages/messages/messages.js";
import {showProfile} from "./pages/profile/profile.js";
import {showError} from "./pages/errors/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");
    root.innerHTML = "";
    const loc = window.location.pathname;
    const loadPage = (path) => {
        if (path === "/" || path === "") {
            window.location.href = "/login";
        } else if (path === "/login") {
            return showAuth();
        } else if (path === "/register") {
            return showRegister();
        }   else if (path === "/messages") {
            return showMessages();
        }  else if (path === "/profile") {
            return showProfile();
        }   else if (path === "/profile-edit") {
            return showProfile("edit");
        }   else if (path === "/profile-edit-password") {
            return showProfile("password");
        }   else if (path === "/500") {
            return showError(500);
        }   else {
            return showError();
        }
    };
    root.innerHTML = loadPage(loc);
});