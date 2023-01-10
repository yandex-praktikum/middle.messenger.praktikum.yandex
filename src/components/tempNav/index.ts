export const tempNav = () => {
  return `
        <div class="temp-nav">
            <div class="temp-nav__title">Временная навигация (закрыть)</div>
            <div class="temp-nav__items">
              <a href="/" rel="link">Страница чатов</a>
              <a href="#sign-in" rel="link">Авторизация</a>
              <a href="#sign-up" rel="link">Регистрация</a>
              <a href="#404" rel="link">Ошибка 404</a>
              <a href="#500" rel="link">Ошибка 500</a>
              <a href="#profile" rel="link">Профиль</a>
              <a href="#profile/edit/" rel="link">Изменить данные</a>
              <a href="#profile/password/" rel="link">Изменить пароль</a>
            </div>
        </div>
    `;
};
