import Block, { TProps } from '../../classes/Block';
import { TMessage } from '../../pages/chat/chat';
import Message from '../message/message';
import templateDialogActive from './dialogActive.hbs';
import './dialogActive.scss';
import avatarDefault from '../../assets/icon/avatar_default.png';
import mediaExample from '../../assets/img/example-media.jpg';


export default class DialogActive extends Block {
    constructor(allProps: TProps) {
        const props: TProps = {
            ...allProps,
            messages: '',
            avatar: allProps.avatar ? allProps.avatar : avatarDefault,
        };

        setGroupMsgToProps(props);

        super('div', props, templateDialogActive);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        if (oldProps.dialog !== newProps.dialog) {
            const children = this._getChildren(newProps).children ?? {};
            this.children = {
                btn: this.children.btn,
                newMsgForm: this.children.newMsgForm,
                ...children,
            };
        }
        return true;
    }

    setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }
        this._prevProps = { ...this.props };
        const newProps = {
            ...this.props,
            ...nextProps,
            messages: '',
        };
        setGroupMsgToProps(newProps);
        Object.assign(this.props, newProps);
    };


    // eslint-disable-next-line no-undef
    render(): string | DocumentFragment {
        return this.compile(this.props);
    }
}


function setGroupMsgToProps(props: TProps = {}): void {
    let currentGroupDate = '00.00.0000';
    const dialog = props.dialog ?? [];
    dialog.forEach((item: TMessage) => {
        if (currentGroupDate !== item.date) {
            currentGroupDate = item.date;
            props.messages += `<div class="dialog-dategroup">${item.date}</div>`;
        }
        const media = item.media ? mediaExample : '';
        const newMSG = new Message({
            ...item,
            media,
            attr: {
                class: `message msg-${item.type} ${item.text ? 'msg-text' : ''} ${item.media ? 'msg-media' : ''}`,
            },
        });
        const id = newMSG._id ?? '';
        props[id] = newMSG;
        props.messages += `<div data-id="${id}"></div>`;
    });
}
