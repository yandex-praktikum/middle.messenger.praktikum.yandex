import {
	FindUserRequest, UserResponse, UserUpdatePasswordRequest, UserUpdateRequest
} from '@models';
import { UserAPI } from '@api';
import { Notifier, Router, Store } from '@services';
import { SETTINGS_PATH } from '@constants';

class UserControllerClass {

	getUserById(id: string): Promise<void> {
		return UserAPI.getUserById(id)
			.then(data => Store.updateState('user', data));
	}

	updateUserAvatar(avatar: FormData): Promise<void> {
		return UserAPI.updateUserAvatar(avatar)
			.then(data => Store.updateState('user', data))
			.then(() => Notifier.success('Аватар успешно обновлен'));
	}

	updateUserData(userData: UserUpdateRequest): Promise<void> {
		return UserAPI.updateUserData(userData)
			.then(data => Store.updateState('user', data))
			.then(() => Notifier.success('Данные успешно обновлены'))
			.then(() => Router.go(SETTINGS_PATH));
	}

	updateUserPassword(passwords: UserUpdatePasswordRequest): Promise<void> {
		return UserAPI.updateUserPassword(passwords)
			.then(() => Notifier.success('Пароль успешно обновлен'))
			.then(() => Router.go(SETTINGS_PATH));
	}

	findUsersByLogin(login: FindUserRequest): Promise<UserResponse[]> {
		return UserAPI.findUsersByLogin(login);
	}
}

export const UserController = new UserControllerClass();
