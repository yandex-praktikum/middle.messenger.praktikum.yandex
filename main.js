import './style.scss';
import { setupPartials } from './src/shared/ui';
import { navigateOnClient } from './src/shared/utils/navigate-on-client';
import * as Pages from './src/pages';
import { LoginPageData } from './src/pages/login/login-data';

setupPartials();

const pages = {
    Login: [Pages.Login, LoginPageData],
    SingIn: [Pages.SingIn],
    Profile: [Pages.Profile],
    ProfileChangesData: [Pages.ProfileChangesData],
};

document.addEventListener('DOMContentLoaded', () =>
    navigateOnClient(pages, 'Login'),
);

// document.addEventListener('click', (event) => {
//     const page = event.target.getAttribute('page');
//     console.log(page, 'page');
//     if (page) {
//         console.log(page, 'in main');
//         navigateOnClient(page);

//         event.preventDefault();
//         event.stopImmediatePropagation();
//     }
// });
