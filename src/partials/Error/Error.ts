import { Block } from "../../core";

interface ErrorProps {
    title: string;
    desc: string;
}

class Error extends Block {
    static componentName = "Error";

    constructor(props: ErrorProps) {
        super(props);
    }

    protected render() {
        return `
            <div class="cover">
                <div class="error">
                    <h1 class="error__title">
                        {{ title }}
                    </h1>
                    <p class="error__desc">
                        {{ desc }}
                    </p>
                    <a class="error__back" href="/">
                        Назад к чатам
                    </a>
                </div>
            </div>
        `;
    }
}

export default Error;
