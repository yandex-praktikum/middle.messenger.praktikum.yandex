import { Block } from "../../core";

class EntryTitle extends Block {
    static componentName = "EntryTitle";

    constructor(props: string) {
        super(props);
    }

    protected render() {
        return `
            <h3 class="entry__title">
                {{ title }}
            </h3>
        `;
    }
}

export default EntryTitle;
