import {User} from "./user";

export interface Chat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: LastMessage;
}

export interface LastMessage {
    user: User;
    time: string;
    content: string;
}




