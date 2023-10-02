import './style.sass'
import {NotFoundPage} from "./pages/error/not-found";
import {ServerErrorPage} from "./pages/error/server-error";
import {SignInPage} from "./pages/sign-in";
import {SignUpPage} from "./pages/sign-up";
import {ChatPage} from "./pages/chat";
import {SettingsPage} from "./pages/settings";

const ROUTES: Record<string, string> = {
    '/not-found': NotFoundPage(),
    '/server-error': ServerErrorPage(),
    '/sign-in': SignInPage(),
    '/sign-up': SignUpPage(),
    '/chats': ChatPage(),
    '/settings': SettingsPage(),
    '/': SignInPage()
    
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    
    if (root) {
        root.innerHTML = ROUTES[window.location.pathname] || NotFoundPage()
    }
})

