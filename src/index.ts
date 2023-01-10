import "reset-css";
import "./styles.scss";

import homePage from "./pages/home/index";
import signInPage from "./pages/sign-in";
import signUpPage from "./pages/sign-up";
import error404Page from "./pages/error404";
import error500Page from "./pages/error500";
import { linkEvents } from "./components/link/linkEvents";
import { tempNavEvents } from "./components/tempNav/tempNavEvents";
import {profilePage, editProfilePage, editProfilePasswordPage} from "./pages/profile";

const root = document.querySelector("#root");
const title = document.querySelector("title");

//const pathName = window.location.pathname;
const pathHash = window.location.hash;

export const pageOpen = (pathHash: string) => {
  let page = homePage();

  if (pathHash === "") page = homePage();
  if (pathHash === "#sign-in") page = signInPage();
  if (pathHash === "#sign-up") page = signUpPage();
  if (pathHash === "#404") page = error404Page();
  if (pathHash === "#500") page = error500Page();
  if (pathHash === "#profile") page = profilePage();
  if (pathHash === "#profile/edit/") page = editProfilePage();
  if (pathHash === "#profile/password/") page = editProfilePasswordPage();

  if (title != null && root != null) {
    title.textContent = page.pageTitle;
    root.innerHTML = page.content;
  }

  tempNavEvents();
  linkEvents();

  return true;
};

pageOpen(pathHash);
