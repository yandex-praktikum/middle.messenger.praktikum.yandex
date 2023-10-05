import { Router } from "./core/index";
import { Authorization, registration as Registration } from "./pages/index";

import "./scss/index.scss";

const router = new Router('#app');
router
  .use("/", Authorization)
  .use("/sign-up", Registration)
  .start()

// const root = document.querySelector('#app');

// if (root) {
//   render(root, page);
// }
