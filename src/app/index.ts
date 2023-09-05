import { registerPartials, registerHelpers, getPageByPath } from "./providers";
import { NavList } from "@/shared/ui";

function app() {
  registerHelpers();
  registerPartials();

  const path = window.location.pathname;
  const page = getPageByPath(path);

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    if (root !== null) {
      root.innerHTML = page();

      function toggleModal() {
        document.querySelector(".modal-overlay")?.classList.toggle("hide");
      }

      document
        .querySelector(".user-image span")
        ?.addEventListener("click", toggleModal);
      document
        .querySelector(".modal-overlay")
        ?.addEventListener("click", toggleModal);

      const navContainer = document.createElement("nav");
      navContainer.classList.add("nav-list");
      navContainer.innerHTML = NavList();
      document.querySelector("#app main")?.append(navContainer);
    }
  });
}

export default app;
