import { Block } from "../../core";

class Error_500 extends Block {
    static componentName = "Error_500";

    protected render() {
        return `
            {{{ Error title="500" desc="Мы уже фиксим" }}}
        `;
    }
}

export default Error_500;
