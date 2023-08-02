import {
	ChatsResponse, ChatUserResponse, CreateChatRequest, DeleteChatRequest, UsersRequest
} from '@models';
import { ChatsAPI } from '@api';
import { Notifier, Store, Router } from '@services';
import { getChats } from '@utilities';
import { CHATS_PATH } from '@constants';

class ChatsControllerClass {

	getAllChats(): Promise<ChatsResponse> {
		return ChatsAPI.getAllChats();
	}

	createChat(chatInfo: CreateChatRequest): Promise<void> {
		return ChatsAPI.createChat(chatInfo)
			.then(() => Notifier.success('Чат успешно создан'))
			.then(this.getAllChats)
			.then(chats => Store.updateState('chats', chats));
	}

	changeChatAvatar(data: FormData): Promise<void> {
		return ChatsAPI.changeChatAvatar(data)
			.then(chat => {
				const chats = Store.getState(getChats);
				const newChats = chats.map(ch => ({
					...ch,
					avatar: ch.id === chat.id ? chat.avatar : ch.avatar
				}));

				Store.updateState('chats', newChats);
			})
			.then(() => Notifier.success('Аватар успешно обновлен'));
	}

	deleteChat(chatInfo: DeleteChatRequest): Promise<void> {
		return ChatsAPI.deleteChat(chatInfo)
			.then(({ result: chat }) => {
				const chats = Store.getState(getChats);
				const newChats = chats.filter(ch => ch.id !== chat.id);

				Store.updateState('chats', newChats);
			})
			.then(() => Notifier.success('Чат успешно удален'))
			.then(() => Router.go(CHATS_PATH));
	}

	addUsersForChat(info: UsersRequest): Promise<void> {
		return ChatsAPI.addUsersForChat(info)
			.then(() => Notifier.success('Пользователи успешно добавлены'));
	}

	deleteUsersFromChat(info: UsersRequest): Promise<void> {
		return ChatsAPI.deleteUsersFromChat(info)
			.then(() => Notifier.success('Пользователи успешно удалены'));
	}

	getChatUsers(chatId: number): Promise<ChatUserResponse[]> {
		return ChatsAPI.getChatUsers(chatId);
	}
}

export const ChatsController = new ChatsControllerClass();
