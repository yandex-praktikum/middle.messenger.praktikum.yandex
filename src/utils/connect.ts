import Block, { PropsAndChildren } from '@/core/Block.ts'
import store, { StoreEvents } from '@/core/Store.ts'

export default function connect<T extends typeof Block>(Component: T) {
  // @ts-expect-error mixin
  return class extends Component {
    constructor(args: PropsAndChildren) {
      super(args)

      store.on(StoreEvents.UPDATED, () => {
        this.setProps({ ...store.getState() })
      })
    }
  }
}
