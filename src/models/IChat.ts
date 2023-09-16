import {User} from "./user";

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: ILastMessage;
}

export interface ILastMessage {
    user: User;
    time: string;
    content: string;
}




