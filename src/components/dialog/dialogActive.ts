/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import { TMessage } from '../../pages/chat/chat';
import templateDialogActive from './dialogActive.hbs';
import './dialogActive.scss';
import avatarDefault from '../../assets/icon/avatar_default.png';
import { connect } from '../../utils/store';
import { getParseDate } from '../../utils/date';
import Store, { Chat, State } from '../../classes/Store';

class DialogActive extends Block {
    currentChat: any;

    // eslint-disable-next-line no-undef
    _dialogWindow: null | HTMLElement = null;

    static getStateToProps(state: State): TProps {
        let props = {
        };
        if (state?.chats) {
            props = {
                currentChat: state?.currentChat?.chat,
                messages: state.currentChat.messages,
                scroll: state.currentChat.scroll,
                attr: {
                    class: `current-dialog ${state.currentChat?.isLoading ? 'loading' : ''} ${state.currentChat?.isLoadingOldMsg ? 'loading-old-msg' : ''}`,
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


    public scrollBottom():void {
        this.getContent().scrollBy(0, this.getContent().scrollHeight + 100);
    }

    public scrollTop():void {
        this.getContent().scrollBy(0, -document.body.scrollHeight);
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


    // eslint-disable-next-line class-methods-use-this
    private formattedMessages(messages: Array<Record<string, string | number>>): Array<string | Chat> | [] {
        if (!messages) return [];
        const formattedMessages: (string | Chat)[] = [];
        let currentGroupDate = '00.00.0000';
        const currentUserId = Store.getState()?.user?.id;

        [...messages].reverse().forEach((item: TMessage) => {
            const timeMsg = item.time ?? '';
            const { date, time } = getParseDate(timeMsg);
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
