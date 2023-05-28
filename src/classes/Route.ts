import { isEqual, render } from '../utils/object_utils';
import Block from './Block';
import Store from './Store';


export default class Route {
    _pathname: string;

    _blockClass: typeof Block | null;

    _block: Block | null;

    _props: Record<string, string>;

    constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            // console.log(this._block);
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._blockClass) {
            return;
        }
        this._block = new this._blockClass();
        render(this._props.rootQuery, this._block);
        Store.set('', '');
    }
}
