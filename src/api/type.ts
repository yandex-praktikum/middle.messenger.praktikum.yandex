export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
};

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type DeleteChatData = {
    chatId: number;
};

export type DataToken = {
    token: string;
};

export type Login = {
    login: string;
};

export type DataAddingUsersToChat = {
    users: number[];
    chatId: number;
};

export type DeleteChat = {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
        created_by: number;
    }
};

export type UserDTCO = Omit<UserDTO, 'phone' | 'email'> & {
    role: string
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
    password: string
};

export type ChangeUser = Omit<UserDTO, 'avatar' | 'id'>;

export type ChangePassword = {
    oldPassword: string,
    newPassword: string
};

export type CreateChat = {
    title: string
};

export type LoginRequestData = {
    login: string,
    password: string
};

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
};

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
};
