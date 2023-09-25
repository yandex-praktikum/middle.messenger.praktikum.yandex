import {
  ChatPage,
  EditPasswordPage,
  EditProfilePage,
  ErrorPage,
  ProfilePage,
  SigninPage,
} from "@/pages";
import { SignupPage } from "@/pages";

const routes = {
  "/": SigninPage,
  "/signin": SigninPage,
  "/signup": SignupPage,
  "/profile": ProfilePage,
  "/profile-edit": EditProfilePage,
  "/password-edit": EditPasswordPage,
  "/chat": ChatPage,
};

function navigate(path: string): void {
  const appContainer = document.querySelector("#app");

  let PageComponent;
  let page;
  if (path in routes) {
    // @ts-ignore
    PageComponent = routes[path];
    page = new PageComponent({});
  } else {
    PageComponent = ErrorPage;
    page = new ErrorPage({ errorCode: 404, errorMessage: "Не туда попали" });
  }

  appContainer?.append(page.getContent());
}

function withRouting(): void {
  document.addEventListener("click", (event: MouseEvent) => {
    if ((event.target as HTMLElement).tagName === "a") {
      event.preventDefault();
      event.stopImmediatePropagation();
      const path = window.location.pathname;
      navigate(path);
    }
  });
}

export { withRouting, navigate };
