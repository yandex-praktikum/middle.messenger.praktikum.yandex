import Router from "./core/Router";

import Authorization from "./pages/Authorization";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileEditAvatar from "./pages/ProfileEditAvatar";
import ProfileEditData from "./pages/ProfileEditData";
import ProfileEditPassword from "./pages/ProfileEditPassword";
import Error500 from "./pages/Error500";
import Error404 from "./pages/Error404";

document.addEventListener("DOMContentLoaded", () => {
    Router
        .use("/", Authorization, {})
        .use("/registration", Registration, {})
        .use("/chat", Chat, {})
        .use("/profile", Profile, {})
        .use("/profile-edit-avatar", ProfileEditAvatar, {})
        .use("/profile-edit-data", ProfileEditData, {})
        .use("/profile-edit-password", ProfileEditPassword, {})
        .use("/error500", Error500, {})
        .use("/error404", Error404, {})
        .start();
});
