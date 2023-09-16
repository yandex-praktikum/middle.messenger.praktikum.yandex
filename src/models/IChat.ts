import {IUser} from "./IUser.ts";

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: ILastMessage;
}

export interface ILastMessage {
    user: IUser;
    time: string;
    content: string;
}




