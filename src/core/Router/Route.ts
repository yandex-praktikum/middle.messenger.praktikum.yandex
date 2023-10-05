import { render } from "../../utils";

export default class Route {
  constructor(pathname: string, view: any, props: object) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {

      console.log(this._blockClass);

      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);

      return;
    }

    this._block.show();
  }
}
