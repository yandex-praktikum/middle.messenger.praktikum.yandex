import * as Pages from './src/pages';
import {
    LoginPageData,
    LoginPageDataEmpty,
    LoginPageDataErrorLogin,
    LoginPageDataErrorLoginPassword,
    LoginPageDataRegistration,
} from './src/pages/login/login-data';
import {
    ProfileModalFileError,
    ProfileModalFileErrorLoad,
    ProfileModalFileLoaded,
    ProfileModalFileToLoad,
    ProfilePageChangesData,
    ProfilePageChangesPassword,
    ProfilePageData,
} from './src/pages/profile/profile-data';
import { setupPartials } from './src/shared/ui';
import { navigateOnClient } from './src/shared/utils/navigate-on-client';
import './style.scss';

setupPartials();

const pages = {
    Login: [Pages.Login, LoginPageData],
    LoginEmpty: [Pages.Login, LoginPageDataEmpty],
    LoginError: [Pages.Login, LoginPageDataErrorLogin],
    LoginErrorPassword: [Pages.Login, LoginPageDataErrorLoginPassword],
    LoginErrorRegistration: [Pages.Login, LoginPageDataRegistration],

    Profile: [Pages.Profile, ProfilePageData],
    ProfileChangesData: [Pages.Profile, ProfilePageChangesData],
    ProfileChangesPassword: [Pages.Profile, ProfilePageChangesPassword],
    ProfileModalFileToLoad: [Pages.ProfileModal, ProfileModalFileToLoad],
    ProfileModalFileLoaded: [Pages.ProfileModal, ProfileModalFileLoaded],
    ProfileModalFileErrorLoad: [Pages.ProfileModal, ProfileModalFileErrorLoad],
    ProfileModalFileError: [Pages.ProfileModal, ProfileModalFileError],

    Messenger: [Pages.Messenger],
    MessengerToChoose: [Pages.MessengerToChoose],
};

document.addEventListener('DOMContentLoaded', () =>
    navigateOnClient(pages, 'Messenger'),
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
