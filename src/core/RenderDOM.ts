import Block from "./Block";

function renderDOM(component: Block) {
    const root = document.querySelector("#root") as HTMLElement;

    root.innerHTML = "";

    root.appendChild(component.getContent()!);
};

export default renderDOM;
