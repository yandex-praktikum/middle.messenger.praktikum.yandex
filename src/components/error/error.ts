import Block from "../../utils/Block";

interface IErrorProps {
    errorNumber: string,
    pageGoBack: string,
    errorText: string,
}

export class Error extends Block {
    constructor(props: IErrorProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        }
    }
    protected render(): string {
        const { errorNumber='',pageGoBack='',errorText=''} = this.props;
        return (`
            <div class="error">
                <h1 class="error__number">${errorNumber}</h1>
                <h2 class="error__text">
                    Woops!
                </h2>
                <h2 class="error__text">
                   ${errorText}
                </h2>
                {{{ Link page='${pageGoBack}' caption='Go Back'  }}}
            </div>
        `)
    }
}
