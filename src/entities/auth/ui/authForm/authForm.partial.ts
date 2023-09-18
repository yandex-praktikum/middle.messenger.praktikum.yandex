import styles from "./authForm.module.css";

function AuthForm() {
  return `
    <form class="${styles.authForm}">
      {{> @partial-block }}
    </form>
  `;
}

export { AuthForm };
