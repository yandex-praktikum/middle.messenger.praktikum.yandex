import './styles/style.scss';

// Components
import { Main } from './pages/Main';
import { Login } from './pages/Login'
import { Profile } from "./pages/Profile";
import {Signin} from "./pages/Signin";
import {ErrorPage} from "./pages/ErrorPage/index.js";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');


    console.log("JS RUN");

    if(!root) return;

    const definitionRoute = () => {
        const route = window.location.pathname;

        switch (route) {
            case "/":
                root.innerHTML = Main({content: 'main'});
                break;
            case "/login":
                root.innerHTML = Login({content: 'login'});
                break;
            case "/signin":
                root.innerHTML = Signin({content: 'signin'});
                break;
            case "/profile":
                root.innerHTML = Profile({content: 'profile'});
                break;
            default:
                root.innerHTML = ErrorPage({content: '404'});
                break
        }

        handlerRoute()
    }

    const handlerRoute = () => {
        const allLink = document.querySelectorAll('a');

        allLink.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const path = e.currentTarget.getAttribute('data-page');
                history.pushState({ page: path }, "", path);

                definitionRoute()
            })
        })
    }

    definitionRoute()
})


