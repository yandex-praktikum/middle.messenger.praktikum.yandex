import EventBus from './EventBus.ts'
import { User } from '@/constants/types.ts'
import { initialState } from '@/constants/initialState.ts'

export enum StoreEvents {
  UPDATED = 'updated',
}

function set(
  object: StateType,
  path: string,
  value: Partial<StateType>
): StateType {
  const parts = path.split('.')
  let current = object

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]

    if (!(part in current)) {
      current[part] = {}
    }

    current = current[part] as StateType

    if (typeof current !== 'object' || current === null) {
      return object
    }
  }

  current[parts[parts.length - 1]] = value
  return object
}

type StateType = {
  userdata: User
  [key: string]: unknown
}

class Store extends EventBus {
  private state: StateType = initialState

  public getState() {
    return this.state
  }

  public set(path: string, value: Partial<StateType>) {
    set(this.state, path, value)
    this.emit(StoreEvents.UPDATED)
  }
}

export default new Store()
