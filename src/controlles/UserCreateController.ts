import authApi from "../api/AuthApi";
import BaseController from "./BaseController";
import UserGetController from "./UserGetController";

class UserCreateController extends BaseController {
    public async create(data) {
        try {
            const { status, response } = await authApi.create(data);
            const currentPath = this.router._currentRoute?._pathname ?? '';
            if (status === 200) {
                UserGetController.getUserInfo();
            } else if (status === 400) {
                alert('Ошибочный запрос');
            } else if (status === 401 || status === 409) {
                alert(JSON.parse(response).reason);
            }
            else if (status === 500) {
                this.router.go('/500');
            }
        } catch (e) {
            console.log(e);
        }
    }

}

export default new UserCreateController();
