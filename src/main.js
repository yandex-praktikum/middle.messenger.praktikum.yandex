import avatar from './assets/svg/Avatar.svg';
import { error_404Template } from './pages/404/404';
import { error_500Template } from './pages/500/500';
import { chatsTemplate } from "./pages/Chats/chats";
import { loginTemplate } from "./pages/Login/login";
import { profileTemplate } from "./pages/Profile/profile";
import { profileEditTemplate } from './pages/ProfileEdit/profileEdit';
import { profileEditPasswordTemplate } from './pages/ProfileEditPassword/profileEditPassword';
import { signInTemplate } from "./pages/SignIn/signIn";
import "./scss/app.scss";

const app = document.querySelector("#app");

window.addEventListener("DOMContentLoaded", () => {
  const route = window.location.pathname.substring(1);
  changeRoute(route);
});

window.addEventListener("click", (e) => {
  const condition =
    e.target.tagName === "A" && e.target.classList.contains("nav__link");

  if (condition) {
    e.preventDefault();

    const href = e.target.getAttribute("href");
    const route = href.substring(1);

    window.history.pushState({}, "", href);

    changeRoute(route);
  }
});

function changeRoute(route) {
  switch (route) {
    case "":
      app.innerHTML = chatsTemplate();
      break;
    case "login":
      app.innerHTML = loginTemplate();
      break;

    case "signIn":
      app.innerHTML = signInTemplate();
      break;

    case "profile":
      app.innerHTML = profileTemplate({ avatar })
      break;

    case "profile/edit-user":
      app.innerHTML = profileEditTemplate({ avatar })
      break;

    case "profile/edit-password":
      app.innerHTML = profileEditPasswordTemplate({ avatar })
      break;

    case "500":
      app.innerHTML = error_500Template();
      break;

    default:
      app.innerHTML = error_404Template()
      break;
  }
}
