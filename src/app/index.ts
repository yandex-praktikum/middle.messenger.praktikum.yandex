import {
  registerPartials,
  registerHelpers,
  registerComponents,
} from "./providers";
import { NavList } from "@/shared/ui";
import { navigate } from "./providers/withRouting";

function app() {
  registerPartials();
  registerHelpers();
  registerComponents();

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    if (root !== null) {
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
    navigate(window.location.pathname);
  });
}

export default app;
