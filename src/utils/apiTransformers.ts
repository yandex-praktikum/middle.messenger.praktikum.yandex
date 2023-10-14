import { ChatDTO, UserDTCO, UserDTO } from '../api/type';
import constants from '../constants';
import {
    Chat, CUser, User, LastMessage, MessageProps,
} from '../type';

const buildPathToResource = (resource: string | null) => {
    if (!resource) {
        return null;
    }

    return `${constants.HOST}/resources/${resource}`;
};

export const transformUser = (data: UserDTO): User => ({
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: buildPathToResource(data.avatar) || '',
    phone: data.phone,
    email: data.email,
});

export const transformToUser = (data: User): CUser => ({
    id: data.id,
    login: data.login,
    firstName: data.firstName,
    secondName: data.secondName,
    displayName: data.displayName,
    avatar: data.avatar,
    role: 'regular',
});

export const transformToCUser = (data: CUser): User => ({
    id: data.id,
    login: data.login,
    firstName: data.firstName,
    secondName: data.secondName,
    displayName: data.displayName,
    avatar: data.avatar,
    phone: '',
    email: '',
});

export const transformChatUser = (data: UserDTCO[]): CUser[] => data.map((user) => ({
    id: user.id,
    login: user.login,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name,
    avatar: buildPathToResource(user.avatar) || '',
    role: user.role,
}));

export const transformChats = (data: ChatDTO[]): Chat[] => data.map((chat) => ({
    avatar: buildPathToResource(chat.avatar),
    id: chat.id,
    title: chat.title,
    unreadCount: chat.unread_count,
    lastMessage: chat.last_message ? {
        content: chat.last_message.content,
        time: chat.last_message.time,
        user: {
            id: chat.last_message.user.id,
            login: chat.last_message.user.login,
            firstName: chat.last_message.user.first_name,
            secondName: chat.last_message.user.second_name,
            displayName: chat.last_message.user.display_name,
            avatar: chat.last_message.user.avatar,
            phone: chat.last_message.user.phone,
            email: chat.last_message.user.email,
        },
    } : null,
}));

export const transformToLastMessage = (message: MessageProps, user: CUser): LastMessage => ({
    user: transformToCUser(user),
    time: message.time,
    content: message.content,
});
