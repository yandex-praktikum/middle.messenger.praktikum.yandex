import { NavigationList } from "@/shared/ui";
import {
  registerPartials,
  registerHelpers,
  registerComponents,
} from "./providers";
import { withRouting } from "./providers/withRouting";
import { AuthAPI } from "@/shared/api/auth";

function app() {
  registerPartials();
  registerHelpers();
  registerComponents();
  withRouting();

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

      console.log(AuthAPI);
    }
  });
}

export default app;
