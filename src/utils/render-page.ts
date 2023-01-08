import { renderDOM } from './render-dom';
import { Block } from './block';

export function renderPage(page: Block): void {
  renderDOM('#app', page);
}
