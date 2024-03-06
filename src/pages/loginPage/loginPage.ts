// language=hbs
import './loginPage.css'

export default `
    <div class="login dialog">
        <div class="wrapper dialog-wrapper">
            <h4 class="login__title">Вход</h4>

            <form action="" class="login-form dialog-form">
                {{> input type="text" name="login" label="Логин" placeholder="Логин..."}}
                {{> input type="password" name="password" label="Пароль" placeholder="Пароль..."}}
                {{> button id="login-btn" label="Авторизоваться" }}
            </form>

            <a class="link" href="#register">Нет аккаунта?</a>
        </div>
    </div>
`
