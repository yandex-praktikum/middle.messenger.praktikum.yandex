import Block from "../core/Block";
import Store, { StoreEvents } from "../core/Store";

class ProfileData extends Block {
    constructor() {
        super();

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <ul class="profile__list">
                <li class="profile__item">
                    <label class="profile__label">
                        Почта
                    </label>
                    <input class="form-input" name="email" type="email" placeholder="Почта" disabled value={{currentUser.email}}>
                </li>
                <li class="profile__item">
                    <label class="profile__label">
                        Логин
                    </label>
                    <input class="form-input" name="login" type="text" placeholder="Логин" disabled value={{currentUser.login}}>
                </li>
                <li class="profile__item">
                    <label class="profile__label">
                        Имя
                    </label>
                    <input class="form-input" name="first_name" type="text" placeholder="Имя" disabled value={{currentUser.first_name}}>
                </li>
                <li class="profile__item">
                    <label class="profile__label">
                        Фамилия
                    </label>
                    <input class="form-input" name="second_name" type="text" placeholder="Фамилия" disabled value={{currentUser.second_name}}>
                </li>
                <li class="profile__item">
                    <label class="profile__label">
                        Имя в чате
                    </label>
                    <input class="form-input" name="display_name" type="text" placeholder="Имя в чате" disabled value={{currentUser.display_name}}>
                </li>
                <li class="profile__item">
                    <label class="profile__label">
                        Телефон
                    </label>
                    <input class="form-input" name="phone" type="text" placeholder="Телефон" disabled value={{currentUser.phone}}>
                </li>
            </ul>
        `, { ...this.props });
    };
};

export default ProfileData;
