import { Block } from '../utils/block';
import { IState } from '../utils/interfaces';
import { isEqual } from '../utils/is-equal';
import store, { StoreEvents } from '../utils/store';

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
