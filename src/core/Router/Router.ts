import Route from "./Route";

export default class Router {
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
    window.onpopstate = (event) => {
      this._onRoute(event.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    console.log(pathname);

    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname);
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
    return this.routes.find(route => route.match(pathname));
  }
}
