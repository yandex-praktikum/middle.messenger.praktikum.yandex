type Page = {
  getContent: Function
}

export default function render(page: Page) {
  document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    app?.append(page.getContent());
  })
}
