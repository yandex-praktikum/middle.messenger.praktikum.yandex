import Route from './Route';
import { BlockType } from './Block';

class Router {
    static __instance: Router | undefined;

    protected routes:Route[] = [];

    protected history: History = window.history;

    protected _currentRoute:Route | null = null;

    protected _rootQuery: string = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname:string, block:BlockType) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            const window = event.currentTarget as Window;
            if (window) {
                this._onRoute(window.location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname:string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname:string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname:string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export default Router;
