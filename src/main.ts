import { renderDOM, registerComponent } from "./core";

// Pages
import Nav from "./pages/Nav";
import { Login, Register } from "./pages/Entry";
import { Chat, ChatList } from "./pages/Chat";
import { Profile, ProfileEditData, ProfileEditPassword } from "./pages/Profile";
import { Error_404, Error_500 } from "./pages/Error";

// Partials
import NavItem from "./partials/NavItem";
import EntryTitle from "./partials/EntryTitle";
import EntryItem from "./partials/EntryItem";
import ChatHolder from "./partials/ChatHolder";
import ChatItem from "./partials/ChatItem";
import ProfileItem from "./partials/ProfileItem";
import ProfileInput from "./partials/ProfileInput";
import ProfileSidebar from "./partials/ProfileSidebar";
import ProfileUser from "./partials/ProfileUser";
import Error from "./partials/Error";
import Button from "./partials/components/button";
import Input from "./partials/components/input";

registerComponent(Nav);
registerComponent(Login);
registerComponent(ChatList);
registerComponent(Chat);
registerComponent(Profile);
registerComponent(ProfileEditData);
registerComponent(ProfileEditPassword);
registerComponent(Error_404);
registerComponent(Error_500);

registerComponent(NavItem);
registerComponent(EntryItem);
registerComponent(EntryTitle);
registerComponent(ChatItem);
registerComponent(ChatHolder);
registerComponent(ProfileItem);
registerComponent(ProfileInput);
registerComponent(ProfileSidebar);
registerComponent(ProfileUser);
registerComponent(Error);
registerComponent(Button);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {
    const pathName = window.location.pathname;

    switch (pathName) {
        case "/":
            renderDOM(new Nav());
            break;
        case "/login":
            renderDOM(new Login());
            break;
        case "/register":
            renderDOM(new Register());
            break;
        case "/chatList":
            renderDOM(new ChatList());
            break;
        case "/chat":
            renderDOM(new Chat());
            break;
        case "/profile":
            renderDOM(new Profile());
            break;
        case "/profileEditData":
            renderDOM(new ProfileEditData());
            break;
        case "/profileEditPassword":
            renderDOM(new ProfileEditPassword());
            break;
        case "/404":
            renderDOM(new Error_404());
            break;
        case "/500":
            renderDOM(new Error_500());
            break;
        default:
            window.location.pathname = "/";
            renderDOM(new Nav());
            break;
    }
});
