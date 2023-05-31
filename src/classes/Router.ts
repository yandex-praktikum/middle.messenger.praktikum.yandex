/* eslint-disable no-undef */
import { rootBlockQuery } from '../utils/config';
import Block from './Block';
import Route from './Route';
import Store from './Store';

// eslint-disable-next-line no-shadow
export enum PathName {
    AUTH = '/',
    SIGNUP = '/sign-up',
    SETTINGS = '/settings',
    MESSENGER = '/messenger',
    ERROR500 = '/error-500',
    ERROR404 = '/error-404',
}

class Router {
    public routes: Array<Route>;

    public history: History;

    public _currentRoute: Route | null;

    _rootQuery: string;

    store: typeof Store | undefined;

    // eslint-disable-next-line no-use-before-define
    static __instance: Router;

    constructor(rootQuery: string = '') {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }
        this.store = Store;
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
        this._currentRoute = null;
        if (this.store?.getState().auth) {
            if (pathname === PathName.AUTH || pathname === PathName.SIGNUP) {
                this._currentRoute = this.getRoute(PathName.MESSENGER) ?? null;
                this.history.pushState({}, '', PathName.MESSENGER);
            }
        } else if (pathname !== PathName.AUTH && pathname !== PathName.SIGNUP) {
            this._currentRoute = this.getRoute(PathName.AUTH) ?? null;
            this.history.pushState({}, '', PathName.AUTH);
        }

        if (!this._currentRoute) {
            this._currentRoute = this.getRoute(pathname) ?? this.getRoute(PathName.ERROR404) ?? null;
        }
        if (!this._currentRoute) {
            return;
        }
        this._currentRoute?.render();
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
