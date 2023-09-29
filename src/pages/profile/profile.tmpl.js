export const tmpl = `
  <section class="profile">
     <a class="profile__back-link" href="/">
         <div class="profile__back">
             <img class="profile__back-icon" src="{{arrow}}" alt="Вернуться назад">
         </div>
     </a>
     <div class="container">
        <div class="profile__content">
          <div class="profile__info">
            <img class="profile__photo" src="{{avatar}}" alt="Фото профиля">
            <p class="profile__name">Иван</p>
  
            <div class="profile__rows">
              <div class="profile__row">
                  <p class="profile__row-label">Почта</p>
                  <input class="profile__row-input" type="text" value="{{email}}" disabled>
              </div>
  
                <div class="profile__row">
                    <p class="profile__row-label">Логин</p>
                    <input class="profile__row-input" type="text" value="{{login}}" disabled>
                </div>
  
                <div class="profile__row">
                    <p class="profile__row-label">Имя</p>
                    <input class="profile__row-input" type="text" value="{{firstName}}" disabled>
                </div>
  
                <div class="profile__row">
                    <p class="profile__row-label">Фамилия</p>
                    <input class="profile__row-input" type="text" value="{{secondName}}" disabled>
                </div>
  
                <div class="profile__row">
                    <p class="profile__row-label">Имя в чате</p>
                    <input class="profile__row-input" type="text" value="{{chatName}}" disabled>
                </div>
  
                <div class="profile__row">
                    <p class="profile__row-label">Телефон</p>
                    <input class="profile__row-input" type="text" value="{{phone}}" disabled>
                </div>
            </div>
            
            <div class="profile__wrapper-control">
              <div class="profile__wrapper-link">
                {{{linkEditInfo}}}
              </div>
              <div class="profile__wrapper-link">
                {{{linkEditPassword}}}
              </div>
              <button class="profile__button">Выйти</button>
             </div>
          </div>
        </div>
     </div>
  </section>
`;
