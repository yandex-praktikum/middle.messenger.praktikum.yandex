const authorizationPage = `
<div class="wrapper">
    <div class="modal-panel">
        <div class="modal-panel__container">
            <div class="modal-panel__title">
                Авторизация
            </div>
            <form class="modal-panel__form">
                <label for="login" class="holder">
                    <span class="holder__span holder__span_hidden">Логин</span>
                    {{{loginInputModalForm}}}
                </label>
                 <label for="password" class="holder">
                    <span class="holder__span holder__span_hidden">Пароль</span>
                    {{{passwordInputModalForm}}}
                </label>
                <div class="modal-panel__buttons">
                    {{{authorizationButton}}}
                    <a class='modal-panel__buttons-link' href="../registration/registration.html">Еще не зарегистрированы?</a>
                </div>
            </form> 
        </div>
    </div>
</div>`;

export { authorizationPage };
