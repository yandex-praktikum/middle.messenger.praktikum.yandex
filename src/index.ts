import './style.css'
import {NotFoundPage} from "./pages/error/not-found";
import {ServerErrorPage} from "./pages/error/server-error";
import {AuthPage} from "./pages/auth";
import {RegPage} from "./pages/reg";
import {ChatPage} from "./pages/chat";

const ROUTES: Record<string, string> = {
    '/not-found': NotFoundPage(),
    '/server-error': ServerErrorPage(),
    '/auth': AuthPage(),
    '/reg': RegPage(),
    '/chat': ChatPage(),
    '/': AuthPage()
    
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    
    if (root) {
        root.innerHTML = ROUTES[window.location.pathname] || NotFoundPage()
    }
    
})
