/* eslint-disable no-undef */
import Block from './Block';
import router from './Router';

describe('Router tests', () => {
    test('Router go', () => {
        router.go('/sign-up');
        expect(window.location.pathname).toBe('/sign-up');
    });
    test('Router back', () => {
        router.go('/sign-up');
        setTimeout(() => {
            router.back();
            expect(window.location.pathname).toBe('/');
        }, 3000);
    });
    test('Router use', () => {
        router.use('/test', Block);
        expect(router.getRoute('/test') !== undefined).toBe(true);
    });
});
