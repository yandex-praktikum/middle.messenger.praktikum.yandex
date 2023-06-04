import Block from "../core/Block";
import Router from "../core/Router";

import ErrorBack from "./ErrorBack";

type Props = {
    title: string,
    desc: string,
    backText: string,
};

class ErrorContainer extends Block {
    constructor(props: Props) {

        const errorBack = new ErrorBack({
            backText: props.backText,
            events: {
                click: () => {
                    Router.back();
                },
            },
        });

        super({ errorBack, ...props });
    };

    render() {
        return this.compile(`
            <div class="error__container">
                <div class="error__text">
                    <h2 class="error__title">
                        {{title}}
                    </h2>
                    <p class="error__desc">
                        {{desc}}
                    </p>
                </div>
                {{{errorBack}}}
            </div>
        `, { ...this.props });
    };
};

export default ErrorContainer;
