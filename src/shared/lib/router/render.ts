import { Component } from "@/shared/model";

function render(query: string, component: Component) {
  const root = document.querySelector(query);
  if (root !== null) {
    root.append(component.getContent());
  }
  return root;
}

export { render };
