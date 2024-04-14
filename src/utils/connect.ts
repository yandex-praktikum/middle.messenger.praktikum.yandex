import Block, { PropsAndChildren } from '@/core/Block.ts'
import store, { StateType, StoreEvents } from '@/core/Store.ts'
import { isEqual } from '@/utils/index.ts'

export default function connect<P extends object>(
  mapStateToProps: (state: StateType) => P
) {
  return function <T extends typeof Block>(Component: T): T {
    // @ts-expect-error mixin
    return class extends Component {
      constructor(args: PropsAndChildren) {
        let state = mapStateToProps(store.getState())
        super(args)

        store.on(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState())

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}

export const withUserdata = connect((state) => ({ userdata: state.userdata }))
export const withUserAvatar = connect((state) => ({
  src: state.userdata.avatar,
}))
export const withChats = connect((state) => ({
  chats: state.chats,
}))
