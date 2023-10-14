import Block, { Props } from '../core/Block';
import { StoreEvents } from '../core/Store';
import { AppState, Chat, User } from '../type';
import isEqual from './isEqual';

export function connect(
    mapStateToProps: (
        state: AppState
    ) => Partial<AppState> | User | Chat[],
) {
    return function fn(Component: typeof Block) {
        return class extends Component {
            private onChangeStoreCallback: () => void;

            constructor(props: Props) {
                const { store } = window;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                };

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
