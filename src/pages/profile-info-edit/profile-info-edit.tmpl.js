export const tmpl = `
  <section class="user-card">
     <a class="user-card__back-link" href="/">
         <div class="user-card__back">
             <img class="user-card__back-icon" src="{{arrow}}" alt="Вернуться назад">
         </div>
     </a>
     <div class="container">
        <div class="user-card__content">
          <div class="user-card__info">
            <img class="user-card__photo" src="{{avatar}}" alt="Фото профиля">
            <p class="user-card__name">Иван</p>
  
            <div class="user-card__rows">
              <div class="user-card__row">
                  <p class="user-card__row-label">Почта</p>
                  <input class="user-card__row-input" type="text" value="{{email}}" disabled>
              </div>
  
                <div class="user-card__row">
                    <p class="user-card__row-label">Логин</p>
                    <input class="user-card__row-input" type="text" value="{{login}}" disabled>
                </div>
  
                <div class="user-card__row">
                    <p class="user-card__row-label">Имя</p>
                    <input class="user-card__row-input" type="text" value="{{firstName}}" disabled>
                </div>
  
                <div class="user-card__row">
                    <p class="user-card__row-label">Фамилия</p>
                    <input class="user-card__row-input" type="text" value="{{secondName}}" disabled>
                </div>
  
                <div class="user-card__row">
                    <p class="user-card__row-label">Имя в чате</p>
                    <input class="user-card__row-input" type="text" value="{{chatName}}" disabled>
                </div>
  
                <div class="user-card__row">
                    <p class="user-card__row-label">Телефон</p>
                    <input class="user-card__row-input" type="text" value="{{phone}}" disabled>
                </div>
            </div>
            
            <div class="user-card__wrapper-button">
              {{{button}}}
             </div>
          </div>
        </div>
     </div>
  </section>
`;
