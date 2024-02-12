import { loginTemplate } from "./pages/Login/login";
import { signInTemplate } from "./pages/SignIn/signIn";
import "./scss/app.scss";

const app = document.querySelector("#app");

window.addEventListener("DOMContentLoaded", () => {
  const route = window.location.pathname.substring(1);

  window.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      window.history.pushState({}, "", href);
      changeRoute(href.substring(1));
    }
  });
  changeRoute(route);
});

function changeRoute(route) {
  switch (route) {
    case "login":
      app.innerHTML = loginTemplate();
      break;

    case "signIn":
      app.innerHTML = signInTemplate();
      break;

    default:
      break;
  }
}
