import regApi from "../api/AuthApi";
import store from "../classes/Store";
import BaseController from "./BaseController";

class UserGetController extends BaseController {
    public async getUserInfo(): Promise<void> {
        try {
            const { status, response } = await regApi.getUser();
            const currentPath = this.router._currentRoute?._pathname ?? '';
            if (status === 200 && response) {
                store.set('user', JSON.parse(response));
                if (currentPath === '/'
                    || currentPath === '/sign-up') {
                    this.router.go('/messenger');
                } else {
                    this.router.go(currentPath);
                }
            } else if (status === 400) {
                alert('Ошибочный запрос');
            } else if (status === 401 && currentPath !== '/' && currentPath !== '/sign-up') {
                this.router.go('/');
            }
            else if (status === 500) {
                this.router.go('/500');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserGetController();
