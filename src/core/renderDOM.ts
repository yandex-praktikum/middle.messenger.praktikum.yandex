import Block from "./Block";

export default function renderDOM(block: Block) {
    const root = document.querySelector("#root");

    root!.innerHTML = "";
    root!.appendChild(block.getContent());
}
