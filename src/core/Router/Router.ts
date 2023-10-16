import Route from "./Route";

import {
  Authorization,
  registration as Registration,
  UserSettings,
  ChatsAndChat,
  EditingSettings,
  EditingPassword,
} from "../../pages/index";

class Router {
  static __instance: Router;
  routes: any;
  history: any;
  _currentRoute: any;
  _rootQuery;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: object) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      event.preventDefault();
      this._onRoute(event.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const inSystem = sessionStorage.getItem("inSystem");

    switch (pathname) {
      case '/':
        if (inSystem === 'true') {
          this.go('/messenger');
          return;
        }
        break;

      case '/sign-up':
        if (inSystem === 'true') {
          this.go('/messenger');
          return;
        }
        break;

      case '/messenger':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/settings':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/editing-settings':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/editing-password':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      default:
        break;
    }

    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/messenger');
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }
}

export default new Router('#app')
  .use("/", Authorization)
  .use("/sign-up", Registration)
  .use('/messenger', ChatsAndChat)
  .use('/settings', UserSettings)
  .use('/editing-settings', EditingSettings)
  .use('/editing-password', EditingPassword)
