import Block, { TProps } from '../../classes/Block';
import { TMessage } from '../../pages/chat/chat';
import Message from '../message/message';
import templateDialogActive from './dialogActive.hbs';
import './dialogActive.scss';
import avatarDefault from '../../assets/icon/avatar_default.png';
import mediaExample from '../../assets/img/example-media.jpg';
import { connect } from '../../utils/store';
import { getParseDate } from '../../utils/date';
import Store from '../../classes/Store';


class DialogActive extends Block {
    currentChat: any;


    _dialogWindow: null | HTMLElement = null;

    static getStateToProps(state) {
        let props = {
        };
        if (state?.chats) {
            props = {
                currentChat: state.currentChat.chat,
                dialog: state.currentChat.messages,
                scroll: state.currentChat.scroll,
            };
        }
        return props;
    }

    constructor(allProps: TProps) {
        const props: TProps = {
            ...allProps,
            scroll: 0,
            messages: '',
            avatar: allProps.avatar ? allProps.avatar : avatarDefault,
        };

        setGroupMsgToProps(props);
        super('div', props, templateDialogActive);


    }
    // _addEvents() { 
    //     this.events['scroll'] = this.test.bind(this);
    //     this._element.addEventListener('scroll', this.events['scroll']);


    //     super._addEvents();
    // }

    // test (e) {
    //     if (e.target.scrollTop) return;
    //     console.log(e.target.scrollTop);
    // }
    public scrollBottom() {
        console.log(this._element);

        this._element.scrollBy(0, this._element.scrollHeight + 100);
    }
    public scrollTop() {
        this._element.scrollBy(0, - document.body.scrollHeight);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {

        if (oldProps.scroll !== newProps.scroll) {
            this.scrollBottom();
            return false;
        }
        if (oldProps.dialog !== newProps.dialog) {
            console.log(oldProps.dialog);
            console.log(newProps.dialog);

            const children = this._getChildren(newProps).children ?? {};
            this.children = {
                btn: this.children.btn,
                newMsgForm: this.children.newMsgForm,
                ...children,
            };
            return true;
        }
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
        const element = this.compile(this.props);
        this._dialogWindow = element.querySelector('.dialog-window');
        return this.compile(this.props);
    }
}


function setGroupMsgToProps(props: TProps = {}): void {
    let currentGroupDate = '00.00.0000';
    let dialog = [];
    if (Array.isArray(props.dialog)) {
        dialog = [...props.dialog];
    }
    const currentUserId = Store.getState()?.user?.id;

    dialog.reverse().forEach((item: TMessage) => {
        const { date, time } = getParseDate(item.time);
        const msgType = currentUserId === item?.user_id ? 'out' : 'in';
        if (currentGroupDate !== date) {
            currentGroupDate = date;
            props.messages += `<div class="dialog-dategroup">${date}</div>`;
        }
        const media = item.media ? mediaExample : '';
        const newMSG = new Message({
            ...item,
            time,
            media,
            attr: {
                class: `message msg-${msgType} ${item.text ? 'msg-text' : ''} ${item.media ? 'msg-media' : ''}`,
            },
        });
        const id = newMSG._id ?? '';
        props[id] = newMSG;
        props.messages += `<div data-id="${id}"></div>`;
    });
}

export default connect(DialogActive);
