import authApi from "../api/AuthApi";
import store from "../classes/Store";
import BaseController from "./BaseController";

class UserLogoutController extends BaseController {
    public async logout(): Promise<void> {
        try {
            const { status } = await authApi.logout();
            if (status === 200) {
                store.set('user', null);
                this.router.go('/');
            } else if (status === 500) {
                this.router.go('/500');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserLogoutController();
