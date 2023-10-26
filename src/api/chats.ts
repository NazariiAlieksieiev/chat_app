import { Chat } from '../types/chat';
import { client } from '../utils/axiosClient';

export const getChats = () => {
  return client.get<Chat[]>('/chats');
};
