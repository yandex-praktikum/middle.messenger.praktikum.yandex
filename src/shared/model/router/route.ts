import { Component } from "@/shared/model";

type Options = {
  rootQuery: string;
};

class Route {
  protected pathname: string;
  protected componentClass: Component;
  protected options: Options;
  protected component: Component | null = null;

  constructor(pathname: string, componentClass: Component, options: Options) {
    this.pathname = pathname;
    this.componentClass = componentClass;
    this.options = options;
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    if (this.component) {
      this.component.hide();
    }
  }

  public match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  public render(): void {
    if (!this.component) {
      this.component = new this.componentClass();
    }
  }
}

export { Route };
