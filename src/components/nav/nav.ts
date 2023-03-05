/* eslint-disable no-undef */
import Block from '../../classes/Block';

type TNav = {
    attr?: Record<string, string>,
    links: Array<Record<string, string>>,
}

export default class Nav extends Block {
    constructor(props: TNav) {
        super('nav', props);
    }

    render() {
        const fragment = document.createElement('template');
        const { links = [] } = this.props;
        if (!links) return fragment.content;
        links.forEach((item: Record<string, string>) => {
            fragment.innerHTML += `<a href="${item.href}">${item.text}</a>`;
        });
        return fragment.content;
    }
}
