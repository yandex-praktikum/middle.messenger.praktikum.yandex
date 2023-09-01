import { registerPartials, registerHelpers, getPageByPath } from "./providers";
import styles from "./styles/index.css";

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
  });
}

export default app;
