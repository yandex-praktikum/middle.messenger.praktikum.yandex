import Block from "../core/Block";

import ErrorContainer from "../components/ErrorContainer";

class Error extends Block {
    constructor() {

        const errorContainer = new ErrorContainer({
            title: "404",
            desc: "Не туда попали",
            backText: "Назад",
        });

        super({ errorContainer });
    };

    render() {
        return this.compile(`
            <main class="error">
                {{{errorContainer}}}
            </main>
        `, { ...this.props });
    };
};

export default Error;
