import { Block } from "./core/block";

function render(query: string, block: Block<any>) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  root.append(block.getContent());
  return root;
}

export { render };
