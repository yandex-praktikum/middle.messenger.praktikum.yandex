// language=hbs
import './profilePage.css'

export default `
    <div class="profile">
        <div class="back">
            <button class="back__button">
                <i class="lni lni-arrow-left"></i>
            </button>
        </div>

        <div class="profile-content">
            {{> avatar src="https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg" alt="avatar"}}

            <span class="profile-content__username">{{userdata.displayName}}</span>

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
                    <button class="profile-actions__button profile-actions__button_blue">Изменить данные</button>
                </div>
                <div class="profile-actions__wrapper">
                    <button class="profile-actions__button profile-actions__button_blue">Изменить пароль</button>
                </div>
                <div class="profile-actions__wrapper">
                    <button class="profile-actions__button profile-actions__button_red">Выйти</button>
                </div>
            </div>
        </div>
    </div>
`
