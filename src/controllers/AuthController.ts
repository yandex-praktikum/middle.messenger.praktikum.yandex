import AuthAPI from "../api/auth-api";
import { Store, router } from "../core";

import type { SignupData, SigninData } from "../api/auth-api";

class AuthController {
  public signup(data: SignupData) {
    AuthAPI.signup(data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("inSystem", "true");
          router.go('/messenger');

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public signin(data: SigninData) {
    AuthAPI.signin(data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("inSystem", "true");
          router.go('/messenger');

          return;
        }

        const { reason } = res.response;

        if (reason === 'User already in system') {
          sessionStorage.setItem("inSystem", "true");
          router.go('/messenger');

          return;
        }

        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public logout() {
    AuthAPI.logout()
      .then(() => {
        sessionStorage.removeItem("inSystem");
        router.go('/');
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public getUserInfo() {
    AuthAPI.getUserInfo()
      .then((res) => {
        if (res.status === 200) {
          Store.set('user', res.response);
        }
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }
}

export default new AuthController();
