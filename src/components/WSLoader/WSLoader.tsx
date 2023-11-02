/* eslint-disable no-console */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { addMessage } from '../../state/features/messages';
import { addChat, deleteChat, renameChat } from '../../state/features/chats';

const API_URL = process.env.REACT_APP_API_URL || '';

export const WSLoader: React.FC = () => {
  const { activeChat } = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = new WebSocket(API_URL);

    if (activeChat?.id) {
      socket.onopen = () => {
        const message = {
          type: 'chatId',
          id: activeChat?.id,
        };

        socket.send(JSON.stringify(message));
      };
    }

    socket.addEventListener('message', (event) => {
      const receivedData = JSON.parse(event.data);
      const {
        type,
        newChat,
        newMessage,
        chatId,
        renamedChat,
      } = receivedData;

      console.log(receivedData);

      switch (type) {
        case 'chat':
          dispatch(addChat(newChat));
          break;
        case 'message':
          dispatch(addMessage(newMessage));
          break;
        case 'deleteChat':
          dispatch(deleteChat(chatId));
          break;
        case 'renameChat':
          dispatch(renameChat(renamedChat));
          break;
        default:
      }
    });

    return () => socket.close();
  }, [activeChat, dispatch]);

  return (
    <h1 className="title">
      {activeChat?.name}
    </h1>
  );
};
