import { routes } from '../constants/routes.ts'
import Block from './Block.ts'
import { Route } from './Route.ts'

export type BlockChild = InstanceType<typeof Block>

export default class Router {
  routes: Route[] = []
  history: History = window.history
  _currentRoute: Route | null = null
  protected _rootQuery: string = ''
  protected static __instance: Router

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }
    this._rootQuery = rootQuery
    Router.__instance = this
  }

  use(pathname: string, block: BlockChild) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget && event.currentTarget instanceof Window) {
        const target = event.currentTarget
        this._onRoute(target.location.pathname)
      }
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      this.go(routes.notFound)
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
    route._block?.dispatchComponentDidMount()
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}
