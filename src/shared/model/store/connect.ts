import { AppState } from "@/app/providers";
import { Component, StoreEvents } from "..";
import { isEqual } from "@/shared/lib";

export function connect(
  mapStateToProps: (state: AppState) => Partial<AppState>,
) {
  return function (Block: typeof Component) {
    return class extends Block {
      private onChangeStoreCallback: () => void;
      constructor(props: any) {
        const store = window.store;
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
        store.register(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.unregister(
          StoreEvents.Updated,
          this.onChangeStoreCallback,
        );
      }
    };
  };
}
