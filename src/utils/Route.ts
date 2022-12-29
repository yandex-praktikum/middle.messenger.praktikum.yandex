//хранит URL и соответствующий ему блок, умеет показывать, скрывать и создавать блоки.
import { isEqual } from './isEqual';
import { renderDOM } from './RenderDOM';
import { Block } from './Block';

export class Route {
    private _block: Block | null = null;
  
    constructor(
      private _pathname: string,
      private blockClass: typeof Block,
      private readonly _query: string
    ) {}
  
    public leave() {
      this._block = null;
    }
  
    public match(pathname: string) {
      return isEqual(pathname, this._pathname);
    }
  
    public render() {
      if (!this._block) {
        this._block = new this.blockClass({});
        renderDOM(this._query, this._block);
      }
    }
}
