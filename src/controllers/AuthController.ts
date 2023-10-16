import AuthAPI from "../api/auth-api";
import { Store, router } from "../core";

import type { SignupData, SigninData } from "../api/auth-api";

class AuthController {
  public signup(data: SignupData) {
    AuthAPI.signup(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          sessionStorage.setItem("inSystem", "true");
          router.go('/messenger');

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public signin(data: SigninData) {
    AuthAPI.signin(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          sessionStorage.setItem("inSystem", "true");
          router.go('/messenger');

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
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
      .then((xhr) => {
        if (xhr.status === 200) {
          const userData = JSON.parse(xhr.responseText);
          Store.set('user', userData);
        }
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }
}

export default new AuthController();
