import { SignInRequest, SignUpRequest, SignUpResponse, UserResponse } from '@models';

import { BaseApi } from './baseApi';

class AuthAPIClass extends BaseApi {

	signup(userData: SignUpRequest): Promise<SignUpResponse> {
		return this.api.post<SignUpResponse>('/auth/signup', {}, userData);
	}

	signin(userData: SignInRequest): Promise<void> {
		return this.api.post('/auth/signin', {}, userData);
	}

	getAuthUser(): Promise<UserResponse> {
		return this.api.get<UserResponse>('/auth/user');
	}

	logout(): Promise<void> {
		return this.api.post('/auth/logout');
	}
}

export const AuthAPI = new AuthAPIClass();
