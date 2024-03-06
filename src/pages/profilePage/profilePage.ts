// language=hbs
import './profilePage.css'

export default `
    <div class="profile">
        <div class="back">
            <button class="back__btn">
                <i class="lni lni-arrow-left"></i>
            </button>
        </div>

        <div class="profile-content">
            {{#if editInfo}}
            {{else if editPassword}}
            {{else}}
                {{> avatar src="https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg" alt="avatar"}}
                <span class="profile-content__username">{{userdata.displayName}}</span>
            {{/if}}

            {{#if editInfo}}

                <form action="" class="profile-edit-form">
                    {{> input type="text" name="email" label="Почта" initialValue=userdata.email placeholder="Почта"}}
                    {{> input type="text" name="login" label="Логин" initialValue=userdata.login placeholder="Логин"}}
                    {{> input type="text" name="first_name" label="Имя" initialValue=userdata.firstName placeholder="Имя"}}
                    {{> input type="text" name="second_name" label="Фамилия" initialValue=userdata.lastName placeholder="Фамилия"}}
                    {{> input type="text" name="display_name" label="Имя в чате" initialValue=userdata.displayName placeholder="Имя в чате"}}
                    {{> input type="text" name="phone" label="Телефон" initialValue=userdata.phone placeholder="Телефон"}}
                        
                    {{> button class="profile-edit-form__save-btn" label="Сохранить" }}
                </form>

            {{else if editPassword}}

                <form action="" class="profile-edit-form">
                    {{> input type="password" name="old_password" label="Старый пароль" placeholder="Старый пароль"}}
                    {{> input type="password" name="new_password" label="Новый пароль" placeholder="Новый пароль"}}
                    {{> input type="password" name="new_password_match" label="Повторите новый пароль" placeholder="Повторите новый пароль"}}

                    {{> button class="profile-edit-form__save-btn" label="Сохранить" }}
                </form>

            {{else}}

                <div class="profile-info">
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Почта</span>
                        <span class="profile-info-row__value">{{userdata.email}}</span>
                    </div>
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Логин</span>
                        <span class="profile-info-row__value">{{userdata.login}}</span>
                    </div>
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Имя</span>
                        <span class="profile-info-row__value">{{userdata.firstName}}</span>
                    </div>
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Фамилия</span>
                        <span class="profile-info-row__value">{{userdata.lastName}}</span>
                    </div>
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Имя в чате</span>
                        <span class="profile-info-row__value">{{userdata.displayName}}</span>
                    </div>
                    <div class="profile-info-row">
                        <span class="profile-info-row__name">Телефон</span>
                        <span class="profile-info-row__value">{{userdata.phone}}</span>
                    </div>
                </div>

                <div class="profile-actions">
                    <div class="profile-actions__wrapper">
                        <a href="#editUserdata" class="link profile-actions__link profile-actions__link_blue">Изменить данные</a>
                    </div>
                    <div class="profile-actions__wrapper">
                        <a href="#editPassword" class="link profile-actions__link profile-actions__link_blue">Изменить пароль</a>
                    </div>
                    <div class="profile-actions__wrapper">
                        <a class="link profile-actions__link profile-actions__link_red">Выйти</a>
                    </div>
                </div>

            {{/if}}
        </div>
    </div>
`
