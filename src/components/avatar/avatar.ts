import  {IProps,Block} from "../../utils/Block";

interface IAvatarProps extends IProps{
    size: 'sm' | 'md',
    isLoadAvatar: boolean,
    onClickLoadAvatar: () => void,
    imageUrl: string
}

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super(props);
        this._props.events = {
            click: props.onClickLoadAvatar || (() => {
            })
        }
    }

    protected render(): string {
        const {size = 'md', isLoadAvatar = false, imageUrl = ''} = this._props as IAvatarProps;
        return (`
            <div class="avatar ${size}">
                ${imageUrl ? `
                    <img src='${imageUrl}' alt="image avatar" class="avatar__image"/>` : ``}
                ${isLoadAvatar ? `
                    <div class="avatar__hover">
                        <div class="avatar__hover__text">Load New Avatar</div>
                    </div>` : ""}
            </div>`)
    }
}
