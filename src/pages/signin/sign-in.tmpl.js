export const tmpl = `
  <section class="sign-in">
    <div class="sign-in__content">
      <div class="sign-in__block">
        <h1 class="sign-in__title">{{title}}</h1>
        <form class="sign-in__form">
          {{{inputEmail}}}
          {{{inputLogin}}}
          {{{inputFirstName}}}
          {{{inputLastName}}}
          {{{inputPhone}}}
          {{{inputPassword}}}
          {{{inputConfirmPassword}}}
          <div class="sign-in__wrapper-button">
            {{{button}}}
          </div>
        </form>
        <div class="sign-in__wrapper-link">
          {{{link}}}
        </div>
      </div>
    </div>
  </section>
`;
