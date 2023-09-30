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
             <label class="user-card__label" for="loadImage">
                <img class="user-card__photo" src="{{avatar}}" alt="Фото профиля">
                <input id="loadImage" type="file" name="avatar">
             </label>
             
            <p class="user-card__name">Иван</p>
  
            <form class="user-card__rows">
              <div class="user-card__row">
                  <p class="user-card__row-label">Почта</p>
                  <input class="user-card__row-input" type="text" value="{{email}}" name="email" disabled>
              </div>
              
              <div class="user-card__row">
                  <p class="user-card__row-label">Логин</p>
                  <input class="user-card__row-input" type="text" value="{{login}}" name="login" disabled>
              </div>
  
              <div class="user-card__row">
                  <p class="user-card__row-label">Имя</p>
                  <input class="user-card__row-input" type="text" value="{{firstName}}" name="first_name" disabled>
              </div>
  
              <div class="user-card__row">
                  <p class="user-card__row-label">Фамилия</p>
                  <input class="user-card__row-input" type="text" value="{{secondName}}" name="second_name" disabled>
              </div>
  
              <div class="user-card__row">
                  <p class="user-card__row-label">Имя в чате</p>
                  <input class="user-card__row-input" type="text" value="{{chatName}}" name="display_name" disabled>
              </div>
  
              <div class="user-card__row">
                  <p class="user-card__row-label">Телефон</p>
                  <input class="user-card__row-input" type="text" value="{{phone}}" name="phone" disabled>
              </div>
              
              <div class="user-card__wrapper-button">
                {{{button}}}
              </div>
            </form>
          </div>
        </div>
     </div>
  </section>
`;
