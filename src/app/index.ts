import { NavigationList } from "@/shared/ui";
import {
  registerPartials,
  registerHelpers,
  registerComponents,
} from "./providers";
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

      document.body.append(new NavigationList({}).getContent() ?? "");
    }
    navigate(window.location.pathname);
  });
}

export default app;
