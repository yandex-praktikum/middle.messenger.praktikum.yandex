import styles from "./authForm.module.css";

function AuthForm() {
  return `
    <form class="${styles.authForm}">
      <div>
        <h3>{{title}}</h3>
      </div>
      {{> @partial-block }}
    </form>
  `;
}

export { AuthForm };
