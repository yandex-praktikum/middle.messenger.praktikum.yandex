export const tmpl = `
  <section class="profile-password-edit">
     <a class="profile-password-edit__back-link" href="/">
         <div class="profile-password-edit__back">
             <img class="profile-password-edit__back-icon" src="{{arrow}}" alt="Вернуться назад">
         </div>
     </a>
     <div class="container">
        <div class="profile-password-edit__content">
          <div class="profile-password-edit__info">
            <img class="profile-password-edit__photo" src="{{avatar}}" alt="Фото профиля">
            <p class="profile-password-edit__name">Иван</p>
  
            <form class="profile-password-edit__rows">
              <div class="profile-password-edit__row">
                  <p class="profile-password-edit__row-label">Старый пароль</p>
                  <input class="profile-password-edit__row-input" type="password" value="{{oldPassword}}" name="oldPassword" disabled>
              </div>
  
              <div class="profile-password-edit__row">
                  <p class="profile-password-edit__row-label">Новый пароль</p>
                  <input class="profile-password-edit__row-input" type="password" value="{{newPassword}}" name="newPassword" disabled>
              </div>

              <div class="profile-password-edit__row">
                  <p class="profile-password-edit__row-label">Повторите новый пароль</p>
                  <input class="profile-password-edit__row-input" type="password" value="{{confirmPassword}}" name="" disabled>
              </div>
              
              <div class="profile-password-edit__wrapper-button">
                  {{{button}}}
              </div>
            </form>
          </div>
        </div>
     </div>
  </section>
`;
