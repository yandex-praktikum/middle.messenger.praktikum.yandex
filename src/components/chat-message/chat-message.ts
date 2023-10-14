import './chat-message.sass';
import chatMessageTmpl from './chat-message.hbs?raw';
import Block, { Props } from '../../core/Block';
import { getUserById, itMe, getAvatar } from '../../services/user';

export class ChatMessage extends Block {
    constructor(props: Props) {
        super({
            ...props,
        });
        this.props.getName = this.getName.bind(this);
        this.props.getTime = this.getTime.bind(this);
        this.props.getAlignment = this.getAlignment.bind(this);
        this.props.getAvatar = this.getAvatar.bind(this);
        this.props.isAvatar = this.isAvatar.bind(this);
    }

    getName() {
        const user = getUserById(this.props.user_id);
        if (user) {
            return user.displayName || `${user.secondName} ${user.firstName}`;
        }
        return 'unknown';
    }

    getAvatar() {
        return getAvatar(this.props.user_id);
    }

    isAvatar() {
        return this.getAlignment() === 'left';
    }

    getAlignment() {
        return itMe(this.props.user_id) ? 'right' : 'left';
    }

    getTime() {
        if (!this.props.time) return '';

        const chatTime = new Date(this.props.time);
        const startDay = new Date();
        startDay.setHours(0, 0, 0, 0);

        const startWeek = new Date();
        startWeek.setHours(0, 0, 0, 0);
        startWeek.setDate(0);
        let options = {};
        if (chatTime > startDay) {
            options = {
                hour: 'numeric',
                minute: 'numeric',
            };
        } else {
            options = {
                hour: 'numeric',
                minute: 'numeric',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            };
        }
        return chatTime.toLocaleString('ru', options);
    }

    protected render(): string {
        return chatMessageTmpl;
    }
}
