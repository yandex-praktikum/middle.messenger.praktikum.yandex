import renderDOM from '../utils/renderDOM.ts'
import Block from './Block.ts'
import { BlockChild } from './Router.ts'

export class Route {
  _pathname: string
  _blockClass: BlockChild
  _block: Block | null
  _props: {
    rootQuery: string
  }

  constructor(
    pathname: string,
    view: BlockChild,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  leave() {
    if (this._block) {
      this._block.componentWillUnmount()
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass

      if (this._block) {
        renderDOM(this._props.rootQuery, this._block)
      }
      return
    }

    renderDOM(this._props.rootQuery, this._block)
  }
}
