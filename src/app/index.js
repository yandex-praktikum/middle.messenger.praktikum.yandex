import { registerPartials, registerHelpers, getPageByPath } from "./providers";
import styles from "./styles/index.css";
import navList from "@/shared/ui/navList/navList.hbs";

function app() {
  registerHelpers();
  registerPartials();

  const path = window.location.pathname;
  const page = getPageByPath(path);

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root.innerHTML = page();

    function toggleModal() {
      document.querySelector(".modal-overlay").classList.toggle("hide");
    }

    try {
      document
        .querySelector(".user-image span")
        .addEventListener("click", toggleModal);
      document
        .querySelector(".modal-overlay")
        .addEventListener("click", toggleModal);
    } catch (error) {}

    const navContainer = document.createElement("nav");
    navContainer.classList.add("nav-list");
    navContainer.innerHTML = navList();
    document.querySelector("#app main").append(navContainer);
  });
}

export default app;
