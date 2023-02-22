import Block from '../classes/Block';
import store, { StoreEvents } from '../classes/Store';

// eslint-disable-next-line import/prefer-default-export
export function connect(Component: typeof Block, getStateToProps: Function = f => f) {
    // используем class expression
    return class extends Component {
        constructor(...args) {
            // не забываем передать все аргументы конструктора
            super(...args);
            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                const props = getStateToProps({...store.getState()});

                this.setProps({ ...props });
                console.log(this.props.data);
            });
        }
    };
}
