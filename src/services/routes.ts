import Router from '../core/Router';

const router = new Router('#app');

const start = () => {
    router.start();
};

const goToProfile = () => {
    router.go('/settings');
};

const goToChat = () => {
    router.go('/messenger');
};

const goToLogin = () => {
    router.go('/login');
};

const goToRegistration = () => {
    router.go('/sign-up');
};

const goTo404 = () => {
    router.go('/404');
};

const goTo500 = () => {
    router.go('/500');
};

export {
    start,
    goToProfile,
    goToChat,
    goToLogin,
    goToRegistration,
    goTo404,
    goTo500,
};
