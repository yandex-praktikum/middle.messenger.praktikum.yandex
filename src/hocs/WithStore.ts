import { Block } from '../utils/Block';
import { IState } from '../utils/Interfaces';
import { isEqual } from '../utils/IsEqual';
import store, { StoreEvents } from '../utils/Store';

export function withStore(mapStateToProps: (state: IState) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any = null;

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState, stateProps)) {
            return;
          }

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
