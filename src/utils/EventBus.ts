export default class EventBus {
    private readonly listeners: { [event: string]: Array<<Type>(...args: Type[]) => void> } = {};

    constructor() {
        this.listeners = {};
    }

    /**
     * Подписка на событие
     * @param event
     * @param callback
     */
    on(event: string, callback: (...args: any)  => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    /**
     * Отписка
     * @param event
     * @param callback
     */
    off(event: string, callback: (...args: any)  => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    /**
     * Триггер события
     * @param event
     * @param args
     */
    emit<Type>(event: string, ...args: Type[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
