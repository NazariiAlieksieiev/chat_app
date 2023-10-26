import { MessageType } from '../types/message';
import { client } from '../utils/axiosClient';

export const getMessages = (chatId: number) => {
  return client.get<MessageType[]>(`/chats/${chatId}`);
};

export const moreMessages = (chatId: number | null, offset: number) => {
  return client.get<MessageType[]>(`/chats/${chatId}?offset=${offset}`);
};
