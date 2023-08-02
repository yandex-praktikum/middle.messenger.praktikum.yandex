export interface SignUpRequest {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface SignUpResponse {
	id: number;
}

export interface SignInRequest {
	login: string;
	password: string;
}

export interface UserResponse {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	email: string;
	phone: string;
}

export interface UserUpdateRequest {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
}

export interface UserUpdatePasswordRequest {
	oldPassword: string;
	newPassword: string;
}

export interface FindUserRequest {
	login: string;
}

export interface ChatsResponse {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: {
		user: UserResponse;
		time: string;
		content: string;
	}
}

export interface CreateChatRequest {
	title: string;
}

export interface DeleteChatRequest {
	chatId: number;
}

export interface DeleteChatResponse {
	userId: number
	result: ChatsResponse;
}

export interface UsersRequest {
	users: number[];
	chatId: number;
}

export interface ChatUserResponse {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	role: 'admin' | 'regular';
}
