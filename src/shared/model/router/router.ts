import { Component } from "..";
import { Route } from "./route";

class Router {
  private static instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private currentRoute: Route | null = null;
  private rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  public use(pathname: string, component: typeof Component): Router {
    const route = new Route(pathname, component, { rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  public start() {
    window.addEventListener("popstate", () => {
      this.onRoute(window.location.pathname);
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

    this.currentRoute = route;

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

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }
}

export { Router };
