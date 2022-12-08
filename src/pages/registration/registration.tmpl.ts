const registrationPage = `
<div class="wrapper">
    <div class="modal-panel">
        <div class="modal-panel__container">
            <div class="modal-panel__title">
                Регистрация
            </div>
            <form class="modal-panel__form">
                <label for="email" class="holder">
                    <span class="holder__span holder__span_hidden">Почта</span>
                    {{{emailInputModalForm}}}
                </label>
                <label for="login" class="holder">
                    <span class="holder__span holder__span_hidden">Логин</span>
                    {{{loginInputModalForm}}}
                </label>
                <label for="first_name" class="holder">
                    <span class="holder__span holder__span_hidden">Имя</span>
                    {{{firstNameInputModalForm}}}
                </label>
                <label for="second_name" class="holder">
                    <span class="holder__span holder__span_hidden">Фамилия</span>
                    {{{secondNameInputModalForm}}}
                </label>
                <label for="phone" class="holder">
                    <span class="holder__span holder__span_hidden">Телефон</span>
                    {{{phoneInputModalForm}}}
                </label>
                <label for="password" class="holder">
                    <span class="holder__span holder__span_hidden">Пароль</span>
                    {{{passwordInputModalForm}}}
                </label>
                <label for="password-confirm" class="holder">
                    <span class="holder__span holder__span_hidden">Подтверждение пароля</span>
                    {{{passwordConfirmModalForm}}}
                </label>
                <div class="modal-panel__buttons">
                    {{{registrationButton}}}
                    <a class='modal-panel__buttons-link' href="../authorization/authorization.html">Уже есть аккаунт?</a>
                </div>
            </form>
        </div>
    </div>
</div>
`;

export { registrationPage };
