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
import { isEqual } from '../../utils/object_utils';


class DialogActive extends Block {
    currentChat: any;

    _dialogWindow: null | HTMLElement = null;

    static getStateToProps(state) {
        let props = {
        };
        if (state?.chats) {
            props = {
                currentChat: state.currentChat.chat,
                messages: state.currentChat.messages,
                scroll: state.currentChat.scroll,
                attr: {
                    class: `current-dialog ${state.currentChat?.isLoading ? 'loading' : ''} ${state.currentChat?.isLoadingOldMsg ? 'loadingOldMsg' : ''}`,
                },
            };
        }
        return props;
    }

    constructor(props: TProps) {
        const formatProps: TProps = {
            ...props,
            avatar: props.avatar ? props.avatar : avatarDefault,
        };
        super('div', formatProps, templateDialogActive);
    }





    public scrollBottom() {

        this._element.scrollBy(0, this._element.scrollHeight + 100);
    }

    public scrollTop() {
        this._element.scrollBy(0, - document.body.scrollHeight);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        // if (isEqual(oldProps, newProps)) {
        //     return false;
        // }
        
        return true;
    }

    public setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }

        const messages = this.formattedMessages(nextProps?.messages);

        const newProps = {
            ...nextProps,
            messages,
        };


        this._prevProps = { ...this.props };
        Object.assign(this.props, newProps);
    };


    private formattedMessages(messages: Array<Record<string, string | number>>): Array<string | any> {
        if (!messages) return [];
        const formattedMessages = [];
        let currentGroupDate = '00.00.0000';
        const currentUserId = Store.getState()?.user?.id;

        [...messages].reverse().forEach((item: TMessage) => {
            const { date, time } = getParseDate(item.time);
            if (currentGroupDate !== date) {
                currentGroupDate = date;
                formattedMessages.push({ dateGroup: date });
            }
            const msgType = currentUserId === item?.user_id ? 'out' : 'in';
            const msgClass = `message msg-${msgType} ${item.content ? 'msg-text' : ''} ${item?.file ? 'msg-media' : ''}`;


            formattedMessages.push({
                ...item,
                time,
                msgClass,
            });
        });
        return formattedMessages;
    }

    // eslint-disable-next-line no-undef
    render(): string | DocumentFragment {
        return this.compile(this.props);
    }
}


export default connect(DialogActive);
