import './style.scss';
import { setupPartials } from './src/shared/ui';
import { navigateOnClient } from './src/shared/utils/navigate-on-client';
import * as Pages from './src/pages';

setupPartials();

const pages = {
    Login: [Pages.Login],
    SingIn: [Pages.SingIn],
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
