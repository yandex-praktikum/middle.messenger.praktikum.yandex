import { NavigationList } from "@/shared/ui";
import {
  registerPartials,
  registerHelpers,
  registerComponents,
} from "./providers";
import { withRouting } from "./providers/withRouting";
import { AuthAPI } from "@/shared/api/auth";

function app() {
  // registerPartials();
  // registerHelpers();
  // registerComponents();
  // withRouting();

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
      const dialog = document.createElement("dialog");
      dialog.textContent = "1234";
      dialog.open = true;
      document.body.append(dialog);
    }
  });
}
const authAPI = new AuthAPI();
authAPI.logout();
authAPI
  .signin({
    login: "jwae4fforafjwoejj",
    password: "sadfjojergoewrjg",
  })
  .then(console.log)
  .catch(console.log);
// authAPI
//   .signup({
//     first_name: "akjfoasfijofjeqgoj",
//     second_name: "jsldkfsjalskdjf",
//     email: "ff24xxx@msilail.ru",
//     login: "jwae4fforafjwoejj",
//     password: "sadfjojergoewrjg",
//     phone: "+7981882319899",
//   })

export default app;
