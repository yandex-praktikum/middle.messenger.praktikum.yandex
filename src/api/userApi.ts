import {
	FindUserRequest, UserResponse, UserUpdatePasswordRequest, UserUpdateRequest
} from '@models';

import { BaseApi } from './baseApi';

class UserAPIClass extends BaseApi {

	getUserById(id: string): Promise<UserResponse> {
		return this.api.get<UserResponse>(`/user/${id}`);
	}

	updateUserAvatar(avatar: FormData): Promise<UserResponse> {
		return this.api.put<UserResponse>('/user/profile/avatar', {}, avatar);
	}

	updateUserData(userData: UserUpdateRequest): Promise<UserResponse> {
		return this.api.put<UserResponse>('/user/profile', {}, userData);
	}

	updateUserPassword(passwords: UserUpdatePasswordRequest): Promise<void> {
		return this.api.put('/user/password', {}, passwords);
	}

	findUsersByLogin(login: FindUserRequest): Promise<UserResponse[]> {
		return this.api.post('/user/search', {}, login);
	}
}

export const UserAPI = new UserAPIClass();
