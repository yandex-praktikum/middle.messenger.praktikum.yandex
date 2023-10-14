import Block from './Block';

export function renderDom(rootQuery: string, block: Block) {
    const root = document.querySelector(rootQuery) as HTMLElement;

    if (root) {
        root.innerHTML = '';
        const content = block.getContent();
        if (content) {
            root.appendChild(content);
        }
        // flow:component-did-mount триггерится вне блока в функции renderDom.
        // Это связано с тем, что оно должно быть вызвано после того,
        // как компонент появился в DOM дереве («замаунтился»).
        block.dispatchComponentDidMount();

        return root;
    }
    return null;
}
