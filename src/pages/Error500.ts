import Block from "../core/Block";

import ErrorContainer from "../components/ErrorContainer";

class Error extends Block {
    constructor() {

        const errorContainer = new ErrorContainer({
            title: "500",
            desc: "Мы уже фиксим",
            backText: "Назад",
        });

        super({ errorContainer });
    };

    render() {
        return this.compile(`
            <div class="error">
                {{{errorContainer}}}
            </div>
        `, { ...this.props });
    };
};

export default Error;
