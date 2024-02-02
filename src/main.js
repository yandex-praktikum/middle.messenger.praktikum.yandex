import {showAuth} from "./pages/auth/auth.js";
import {showRegister} from "./pages/register/register.js";

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
        }
    };
    root.innerHTML = loadPage(loc);
});