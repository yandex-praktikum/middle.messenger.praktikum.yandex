import {IProps,Block} from "../../utils/Block";

interface IModalProps extends IProps {
    caption: string,
    okText: string,
    okClick: () => void,
    cancelText: string,
    cancelClick: () => void,
}

export class Modal extends Block {
    constructor(props: IModalProps) {
        super(props);

    }
    public get props(){
        return this._props as IModalProps;
    }
    protected render(): string {
        const {  caption='',okText='',cancelText=''} = this.props;
        return (`
            <form class="modal-background">
                <div class="modal container-shadow ">
                    <h2 class="modal__header">
                        ${caption}
                    </h2>
                    <div>
                       
                    </div>
                    <div class="modal__footer">
                         {{{ Button caption="${okText}" onClick=okClick }}}
                        {{{ Button caption="${cancelText}" onClick=cancelClick }}}
                    </div>
                </div>
            </form>
        `)
    }
}
