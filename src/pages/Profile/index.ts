export { default as Profile } from "./Profile";
export { default as ProfileEditData } from "./ProfileEditData";
export { default as ProfileEditPassword } from "./ProfileEditPassword";

export interface ProfileProps {
    key: string;
    value: string;
}

export const ProfileDataList: ProfileProps[] = [
    {
        key: "Почта",
        value: "pochta@yandex.ru",
    },
    {
        key: "Логин",
        value: "magomedaliev",
    },
    {
        key: "Имя",
        value: "Магомед",
    },
    {
        key: "Фамилия",
        value: "Алиев",
    },
    {
        key: "Имя в чате",
        value: "Магомед",
    },
    {
        key: "Телефон",
        value: "+7 (999) 999 99 99",
    },
];
