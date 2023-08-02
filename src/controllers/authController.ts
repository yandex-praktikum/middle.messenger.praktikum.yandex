import { AuthAPI } from '@api';
import { SignInRequest, SignUpRequest } from '@models';
import { Store, Router } from '@services';
import { CHATS_PATH, LOGIN_PATH } from '@constants';

import { ChatsController } from './chatsController';

class AuthControllerClass {

	signup(data: SignUpRequest): Promise<void> {
		return AuthAPI.signup(data)
			.then(this.getAuthUser)
			.then(() => Router.go(CHATS_PATH));
	}

	signin(data: SignInRequest): Promise<void> {
		return AuthAPI.signin(data)
			.then(this.getAuthUser)
			.then(() => Router.go(CHATS_PATH));
	}

	getAuthUser(): Promise<void> {
		return AuthAPI.getAuthUser()
			.then(data => Store.updateState('user', data))
			.then(ChatsController.getAllChats)
			.then(chats => Store.updateState('chats', chats))
			.catch(() => Store.updateState('user', null));
	}

	logout(): Promise<void> {
		return AuthAPI.logout()
			.then(() => Store.updateState('user', null))
			.then(() => Router.go(LOGIN_PATH));
	}
}

export const AuthController = new AuthControllerClass();
