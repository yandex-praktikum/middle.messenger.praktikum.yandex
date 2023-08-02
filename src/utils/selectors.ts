import { AppStore } from '@services';

export const getAuthUser = (store: AppStore) => store.user;
export const getAuthUserAvatar = (store: AppStore) => getAuthUser(store)?.avatar;

export const getChats = (store: AppStore) => store.chats;
export const getChatById = (chatId: number) =>
	(store: AppStore) => store.chats.find(({ id }) => id === chatId)!;

export const getSelectedChatId = (store: AppStore) => store.selectedChatId;
