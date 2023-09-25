import { Component } from "..";
import { Route } from "./route";

class Router {
  private static instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private currentRoute: Route | null = null;
  private rootQuery: string = "";

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;
  }

  public use(pathname: string, component: Component): Router {
    const route = new Route(pathname, component, { rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  public start() {
    window.addEventListener("popstate", (event: PopStateEvent) => {
      this.onRoute(event.currentTarget.location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  protected onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    route.render();
  }

  public go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => {
      if (route.match(pathname)) {
        return true;
      }
    });
  }
}

export { Router };
