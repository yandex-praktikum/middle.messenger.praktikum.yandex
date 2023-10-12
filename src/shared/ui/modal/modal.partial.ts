import styles from "./modal.module.css";

function Modal() {
  return `
    <div class="${styles.modalOverlay}">
      <div class="${styles.modal}">
        {{> @partial-block }}
      </div>
    </div>
  `;
}

export { Modal };
