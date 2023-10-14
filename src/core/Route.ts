import { renderDom } from './renderDOM';
import Block, { Props, BlockType } from './Block';

class Route {
    protected _pathname:string;

    protected _blockClass:BlockType;

    protected _block:Block | null = null;

    protected _props:Props;

    constructor(pathname:string, view:BlockType, props:Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block = null;
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            renderDom(this._props.rootQuery as string, this._block);
            return;
        }

        this._block.show();
    }
}

export default Route;
