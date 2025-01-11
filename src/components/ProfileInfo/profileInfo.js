import './profileInfo.scss';

export default `
    <input type="file" id="avatar" class="avatar" accept="image/png, image/jpeg" />
    <div class="main" id="main">
        <div class="main__avatar action" data-id="changePhoto">
            <img src="/img/circle_gray.svg" alt="Аватар">
        </div>
        <div class="main__name">
            <span>{{ first_name }}</span>
        </div>
        <div class="main__info" id="main__info">
            {{#if mode}}
                {{> Input 
                    labelFor="password"
                    label="Пароль"
                    id="password"
                    name="password"
                    placeholder="Введите пароль"
                    value=password
                }}
                {{> Input 
                    labelFor="newPassword"
                    label="Новый пароль"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Введите новый пароль"
                }}
                {{> Input 
                    labelFor="repeatPassword"
                    label="Повторите новый пароль"
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="Введите пароль"
                }}

                {{else}}
                    {{> Input 
                        labelFor="login"
                        label="Логин"
                        id="login"
                        name="login"
                        placeholder="Введите логин"
                        value=login
                    }}
                    {{> Input 
                        labelFor="email"
                        label="Почта"
                        id="email"
                        name="email"
                        placeholder="Введите почту"
                        value=email
                    }}
                    {{> Input 
                        labelFor="first_name"
                        label="Имя"
                        id="first_name"
                        name="first_name"
                        placeholder="Введите имя"
                        value=first_name
                    }}
                    {{> Input 
                        labelFor="second_name"
                        label="Фамилия"
                        id="second_name"
                        name="second_name"
                        placeholder="Введите фамилию"
                        value=second_name
                    }}
                    {{> Input 
                        labelFor="display_name"
                        label="Отображаемое имя"
                        id="display_name"
                        name="display_name"
                        placeholder="Введите отображаемое имя"
                        value=display_name
                    }}
                    {{> Input 
                        labelFor="phone"
                        label="Телефон"
                        id="phone"
                        name="phone"
                        placeholder="Введите телефон"
                        value=phone
                    }}
            {{/if}}
        </div>
        <div class="main__actions" id="main__actions">
            {{#if mode}}
                <span class="main__actions-accept action" data-id="save">Сохранить</span>
                <span class="main__actions-reject action" data-id="cancel">Отмена</span>
                {{else}}
                    <span class="main__actions-accept action" data-id="changeData">Изменить данные</span>
                    <span class="main__actions-accept action" data-id="changePassword">Изменить пароль</span>
                    <span class="main__actions-reject action" data-id="remove">Удалить профиль</span>
                    <span class="main__actions-reject action" data-id="exit">Выйти</span>
            {{/if}}
        </div>
    </div>
`;
