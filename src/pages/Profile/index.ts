export { default as Profile } from "./Profile";
export { default as ProfileEditData } from "./ProfileEditData";
export { default as ProfileEditPassword } from "./ProfileEditPassword";

export interface ProfileProps {
    key: string;
    value: string;
    name?: string;
    type?: string;
}

export const ProfileDataList: ProfileProps[] = [
    {
        key: "Почта",
        value: "pochta@yandex.ru",
        name: "email",
        type: "email",
    },
    {
        key: "Логин",
        value: "magomedaliev",
        name: "login",
        type: "text",
    },
    {
        key: "Имя",
        value: "Магомед",
        name: "first_name",
        type: "text",
    },
    {
        key: "Фамилия",
        value: "Алиев",
        name: "second_name",
        type: "text",
    },
    {
        key: "Имя в чате",
        value: "Магомед",
        name: "username",
        type: "text",
    },
    {
        key: "Телефон",
        value: "+79999999999",
        name: "phone",
        type: "text",
    },
];
