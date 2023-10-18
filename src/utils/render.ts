import { initDropdowns } from "./index";

type Page = {
  getContent: Function
}

export default function render(root: string, page: Page) {
  const renderPlace = document.querySelector(root);

  if (renderPlace) {
    renderPlace.append(page.getContent());
    initDropdowns();
  } else {
    throw new Error('The render root is not found');
  }
}
