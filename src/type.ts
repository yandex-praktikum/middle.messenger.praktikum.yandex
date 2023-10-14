export type AppState = {
    error: string | null;
    user: User | null;
    isOpenDialogChat: boolean;
    isOpenDialogPassword: boolean;
    isOpenDialogChatMenu: boolean;
    isOpenDialogChoiceUser: boolean;
    chats: Chat[];
    currentChat: number | null;
    currentChatUsers: CUser[] | [];
    searchChatUsers: User[];
    loginSearch: boolean;
    currentChatMessages: MessageProps[];
};

export type MessageProps = {
    content: string;
    time: string;
    user_id: number;
    type: string;
};

export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

export type CUser = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    role: string;
};

export type LastMessage = {
    user: User,
    time: string,
    content: string
};

export type Chat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unreadCount: number,
    lastMessage: LastMessage | null
};
