// language=hbs
import './registerPage.css'

export default `
    <div class="register">
        <div class="wrapper">
            <h4>Регистрация</h4>

            <form action="" class="register-form">
                {{> input type="text" name="email" label="Почта" placeholder="Почта..."}}
                {{> input type="text" name="login" label="Логин" placeholder="Логин..."}}
                {{> input type="text" name="first_name" label="Имя" placeholder="Имя..."}}
                {{> input type="text" name="second_name" label="Фамилия" placeholder="Фамилия..."}}
                {{> input type="text" name="phone" label="Телефон" placeholder="Телефон..."}}
                {{> input type="password" name="password" label="Пароль" placeholder="Пароль..."}}
                {{> input type="password" name="password-verify" label="Пароль ещё раз" placeholder="Повторите пароль..."}}
                {{> button label="Зарегистрироваться" }}
            </form>

            <a class="link" href="#login">Войти</a>
        </div>
    </div>
`
