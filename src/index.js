import {Login} from "./pages/Login/index.js";
import {ErrorPage} from "./pages/Error/index.js";
import {Profile} from "./pages/Profile/index.js";
import {Chats} from "./pages/Chats/index.js";
import './assets/style/style.scss';

let pageFunction = (pathname) => {
    switch (pathname) {
        case '/':
        case "/signup":
            return Login(true);
        case '/signin':
            return  Login(false);
        case '/chats':
            return Chats();
        case '/profile':
            return Profile();
        case '/servererror':
            return ErrorPage(true);
        default:
            return ErrorPage();
    }
};

document.addEventListener('DOMContentLoaded', ()=>{
    const root = document.querySelector('#app');
    let pathname = window.location.pathname;

    root.innerHTML = `<div class="container">${pageFunction(pathname)}</div>`;
});