import authApi from "../api/AuthApi";
import store from "../classes/Store";
import BaseController from "./BaseController";
import UserGetController from "./UserGetController";

class UserLoginController extends BaseController {
    public async login(data): Promise<void> {
        try {
            const { status, response } = await authApi.login(data);
            const currentPath = this.router._currentRoute?._pathname ?? '';
            if (status === 200) {
                UserGetController.getUserInfo();
            } else if (status === 400) {
                alert('Ошибочный запрос');
            } else if (status === 401) {
                alert('Введенные логин или пароль не соответсвуют учетной записи');
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

export default new UserLoginController();
