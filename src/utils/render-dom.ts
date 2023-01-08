import { Block } from './block';

export function renderDOM(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (root === null) {
    throw new Error(`root not found by selector '${rootSelector}'`);
  }

  root.textContent = '';

  root.append(component.getContent()!);

  return root;
}
