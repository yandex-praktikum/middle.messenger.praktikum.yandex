export const tmpl = `
  <section class="login">
    <div class="login__content">
      <div class="login__block">
        <h1 class="login__title">{{title}}</h1>
        <form class="login__form">
          {{{inputLogin}}}
          {{{inputPassword}}}
          <div class="login__wrapper-button">
            {{{button}}}
          </div>
        </form>
        <div class="login__wrapper-link">
          {{{link}}}
        </div>
      </div>
    </div>
  </section>
`;
