import {
  ChatPage,
  EditProfilePage,
  ProfilePage,
  SigninPage,
  SignupPage,
} from "@/pages";
import { Router } from "@/shared/model";

enum Routes {
  Home = "/",
  SignUp = "/sign-up",
  Messenger = "/messenger",
  Profile = "/profile",
  SignIn = "/sign-in",
  ProfileEdit = "/settings",
}

const rootQuery = "#app";
const router = new Router(rootQuery);
router
  .use(Routes.Home, SigninPage)
  .use(Routes.Profile, ProfilePage)
  .use(Routes.ProfileEdit, EditProfilePage)
  .use(Routes.SignUp, SignupPage)
  .use(Routes.SignIn, SigninPage)
  .use(Routes.Messenger, ChatPage);

function withRouting() {
  window.router = router;
  router.start();
}

export { withRouting, Routes, router };
