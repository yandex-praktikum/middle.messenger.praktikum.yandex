import { NavigationList } from "@/shared/ui";
import {
  registerPartials,
  registerHelpers,
  registerComponents,
  withStore,
} from "./providers";
import { Routes, router, withRouting } from "./providers/withRouting";
import { AuthAPI } from "@/shared/api/auth";

async function app() {
  withStore();
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
    }
  });

  const authAPI = new AuthAPI();

  try {
    const me = (await authAPI.getUser()) as any;
    if (window.location.pathname === Routes.SignUp) {
      router.go(Routes.SignUp);
      return;
    }
    if (me.reason) {
      router.go(Routes.Home);
    }
    window.store.set({ user: me });
  } catch (error) {
    router.go(Routes.Home);
  }
}

// const chatAPI = new ChatAPI();
// // chatAPI.create("test").then(console.log);
// chatAPI.getAll().then(console.log);
// chatAPI.getToken("27462").then(async ({ token }) => {
//   const wsClient = new WSClient(
//     `wss://ya-praktikum.tech/ws/chats/1346861/27462/${token}`,
//   );
//   await wsClient.connect();
//   wsClient.send({ type: "ping" });
// });

// authAPI.logout();

// authAPI
//   .signin({
//     login: "jfforafjwoejj",
//     password: "sadA1fjojergoewrjg",
//   })
// .then(console.log)
// .catch(console.log);
// authAPI
//   .signup({
//     first_name: "akjfoasfijofjeqgoj",
//     second_name: "jsldkfsjalskdjf",
//     email: "ff24xx@msilail.ru",
//     login: "jfforafjwoejj",
//     password: "sadA1fjojergoewrjg",
//     phone: "+7981882319899",
//   })
//   .then(console.log)
//   .catch(console.log);

export default app;
