export { default as Chat } from "./Chat";
export { default as ChatList } from "./ChatList";

export interface ChatProps {
    mod: string;
    name: string;
    message: string;
    time: string;
    count: number;
}

export const ChatData: ChatProps[] = [
    {
        mod: "chat__inner_select",
        name: "Магомед",
        message: "Lorem ipsum dolor sit amet",
        time: "12:34",
        count: 4,
    },
    {
        mod: "",
        name: "Магомед",
        message: "Lorem ipsum dolor sit amet",
        time: "1 декабря 2022",
        count: 7,
    },
    {
        mod: "",
        name: "Магомед",
        message: "Lorem ipsum dolor sit amet",
        time: "24 ноября 2022",
        count: 3,
    },
    {
        mod: "",
        name: "Магомед",
        message: "Lorem ipsum dolor sit amet",
        time: "5 декабря 2022",
        count: 5,
    },
];
