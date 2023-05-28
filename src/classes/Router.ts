/* eslint-disable no-undef */
import { rootBlockQuery } from '../utils/config';
import Block from './Block';
import Route from './Route';
import Store from './Store';

export const AUTH = '/';
export const SIGNUP = '/sign-up';
export const SETTINGS = '/settings';
export const MESSENGER = '/messenger';
export const ERROR500 = '/error-500';
export const ERROR404 = '/error-404';

class Router {
    public routes: Array<Route>;

    // eslint-disable-next-line no-undef
    public history: History;

    public _currentRoute: Route | null;

    _rootQuery: string;

    // eslint-disable-next-line no-use-before-define
    static __instance: Router;

    constructor(rootQuery: string = '') {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = ((event: Event) => {
            const target = event?.currentTarget as Window;
            this._onRoute(target?.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        if (Store.getState().auth) {
            if (pathname === AUTH || pathname === SIGNUP) {
                pathname = MESSENGER;
                this.history.pushState({}, '', MESSENGER);
            }
        } else if (pathname !== AUTH && pathname !== SIGNUP) {
            pathname = AUTH;
            this.history.pushState({}, '', AUTH);
        }

        const route: Route | undefined = this.getRoute(pathname) ?? this.getRoute(ERROR404);
        if (!route) {
            return;
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find((route) => route.match(pathname));
    }
}

export default new Router(rootBlockQuery);
