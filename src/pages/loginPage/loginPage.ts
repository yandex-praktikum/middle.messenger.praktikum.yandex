// language=hbs
import './loginPage.css'

export default `
    <div class="login">
        <div class="wrapper">
            <h4>Вход</h4>

            <form action="" class="login-form">
                {{> input type="text" name="login" label="Логин" placeholder="Логин..."}}
                {{> input type="password" name="password" label="Пароль" placeholder="Пароль..."}}
                {{> button id="login-btn" label="Авторизоваться" }}
            </form>

            <a class="link" href="#register">Нет аккаунта?</a>
        </div>
    </div>
`
