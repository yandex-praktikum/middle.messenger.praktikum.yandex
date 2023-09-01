import loginPage from "@/pages/login/loginPage.hbs";
import signupPage from "@/pages/signup/signupPage.hbs";
import profilePage from "@/pages/profile/profilePage.hbs";
import errorPage from "@/pages/error/errorPage.hbs";
import editProfilePage from "@/pages/editProfile/editProfilePage.hbs";
import editPasswordPage from "@/pages/editPassword/editPasswordPage.hbs";
import chatPage from "@/pages/chat/chatPage.hbs";

const routes = {
  "/": loginPage,
  "/signin": loginPage,
  "/signup": signupPage,
  "/profile": profilePage,
  "/error": serverErrorPage,
  "/profile-edit": editProfilePage,
  "/password-edit": editPasswordPage,
  "/chat": chatPage,
};

function notFoundPage() {
  const context = {
    errorCode: 404,
    errorMessage: "Не туда попали",
  };
  return errorPage(context);
}

function serverErrorPage() {
  const context = {
    errorCode: 500,
    errorMessage: "Мы уже фиксим",
  };
  return errorPage(context);
}

function getPageByPath(path) {
  if (path in routes) {
    return routes[path];
  }

  return notFoundPage;
}

export { getPageByPath };
