import {IProps,Block} from "../../utils/Block";

interface ILinkProps extends IProps{
    caption: string,
    page?: string,
    href?: string,
    type: string,
    linkIcon?:boolean
    linkLine?:boolean
}

export class Link extends Block {
    constructor(props: ILinkProps) {
        super(props);
    }
    public get props(){
        return this._props as ILinkProps;
    }
    protected render(): string {
        const { href='#', caption='', page='' ,linkIcon=false,linkLine=false,type=''} = this.props;
        const classLink=`link ${type?`link-${type}`:''} ${linkLine?'link-line':''}`
        return (`
            <a href= ${href}
               class="${classLink}"
               ${page?`page=${page}`:''}>
                ${caption}
                ${linkIcon ? '<div class="link-icon"></div>' : ''}
            </a>
        `)
    }
}
