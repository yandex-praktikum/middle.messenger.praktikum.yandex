type Page = {
  getContent: Function
}

export default function render(root: string, page: Page) {
  document.addEventListener('DOMContentLoaded', () => {
    const renderPlace = document.querySelector(root);

    if (renderPlace) {
      renderPlace.append(page.getContent());
    } else {
      throw new Error('The render root is not found');
    }
  })
}
