const profile = `
<div class="profile-page-wrapper">
    <div class="back">
        <a href="../chat/chat.html">
            <div class="back__img">
                {{{backButton}}}
            </div>
        </a>
    </div>
   <div class="profile-wrapper">
    <div class="profile">
        <div class="profile__inner">
            <div class="profile__title">
                <label for="avatar" class="profile__avatar-block" >
                    <img src="../../../static/images/profile-avatar.svg" alt="Profile-avatar" class="profile__avatar">
                </label>
                <div class="profile__name">Иван</div>
            </div>
            <form action="" class="profile__info-form">
                <div class="profile__info">
                    <div class="profile__info-list">
                    <div class="profile__info-item">
                       <div class="profile__info-name">Почта</div>
                       <div class="profile__info-value-block">
                           {{{emailInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Логин</div>
                       <div class="profile__info-value-block">
                           {{{loginInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Имя</div>
                       <div class="profile__info-value-block">
                           {{{firstNameInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Фамилия</div>
                       <div class="profile__info-value-block">
                           {{{secondNameInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Имя в чате</div>
                       <div class="profile__info-value-block">
                           {{{chatNameInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Телефон</div>
                       <div class="profile__info-value-block">
                           {{{phoneInput}}}
                       </div>
                    </div>
                    </div>
                </div>
                <div class="profile__buttons">
                    <div class="profile__btn-block">
                        {{{editInformationButton}}}  
                    </div>
                    <div class="profile__btn-block">
                        {{{editPasswordButton}}}
                    </div>
                    <div class="profile__btn-block">
                        {{{exitButton}}}
                    </div>
                    <div class="profile__btn-save-block">
                        {{{saveEditButton}}}
                    </div>
                </div>
            </form>
            <form action="" class="profile__change-password">
                <div class="profile__info">
                    <div class="profile__info-list">
                    <div class="profile__info-item">
                       <div class="profile__info-name">Старый пароль</div>
                       <div class="profile__info-value-block">
                           {{{oldPasswordInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Новый пароль</div>
                       <div class="profile__info-value-block">
                           {{{newPasswordInput}}}
                       </div>
                    </div>
                    <div class="profile__info-item">
                       <div class="profile__info-name">Повторите новый пароль</div>
                       <div class="profile__info-value-block">
                           {{{repeatPasswordInput}}}
                       </div>
                    </div>
                    </div>
                </div>
                <div class="profile__buttons profile__buttons_edit">
                    <div class="profile__btn-save-block">
                    {{{savePasswordButton}}}
                    </div>
                </div>
            </form>
        </div>
    </div>
   </div>
   </div>
`;

export { profile };
