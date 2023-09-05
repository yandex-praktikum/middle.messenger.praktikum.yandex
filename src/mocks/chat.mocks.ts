import {Chat} from "../models/chat";


export const chat1: Chat = {
    id: 123,
    title: "my-chat",
    avatar: `3.jpg`,
    unread_count: 15,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Petya",
            second_name: "Pupkin",
            avatar: `3.jpg`,
            email: "my@email.com",
            login: "userLogin",
            phone: "8(911)-222-33-22",
        },
        time: "01.20",
        content: "this is message content this is message content this is message content this is message content"
    }
}

export const chat2: Chat = {
    id: 124,
    title: "my-chat1",
    avatar: `1.jpeg`,
    unread_count: 15,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Lena",
            second_name: "Lukova",
            avatar: `1.jpg`,
            email: "my@email.com",
            login: "lenaLogin",
            phone: "8(911)-222-33-22",
        },
        time: "Fr",
        content: "supper content"
    }
}

export const chat3: Chat = {
    id: 125,
    title: "my-chat3",
    avatar: `2.jpg`,
    unread_count: 0,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Lena",
            second_name: "Lukova",
            avatar: `2.jpg`,
            email: "my@email.com",
            login: "lenaLogin",
            phone: "8(911)-222-33-22",
        },
        time: "20 may 2023",
        content: "supper content"
    }
}

export const mockListChats = [chat1, chat2, chat3]

