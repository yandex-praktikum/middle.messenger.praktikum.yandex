import { Block } from "../../core";

class Error_404 extends Block {
    static componentName = "Error_404";

    protected render() {
        return `
            {{{ Error title="404" desc="Не туда попали" }}}
        `;
    }
}

export default Error_404;
