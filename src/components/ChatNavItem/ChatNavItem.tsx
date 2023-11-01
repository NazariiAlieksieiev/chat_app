import React, { MouseEvent } from 'react';
import '../ChatNav/ChatNav.scss';
import { error } from 'console';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { selectChat } from '../../state/features/chats';
import { Chat } from '../../types/chat';
import { socket } from '../../api/socket';
import { errorNotification } from '../../utils/notification';

interface Props {
  chat: Chat,
}

export const ChatNavItem: React.FC<Props> = ({
  chat,
}) => {
  const { activeChat } = useAppSelector(state => state.chats);
  const username = localStorage.getItem('username');

  const dispatch = useAppDispatch();

  const handleChatIdButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(selectChat(chat));
  };

  const isActive = activeChat?.id === chat.id
    ? 'chat-nav__open-chat-active'
    : '';

  const deleteChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { chatAuthor, id } = chat;

    if (username !== chatAuthor) {
      errorNotification('Chat can delete only his author');

      return;
    }

    const deleteChatMessage = {
      type: 'deleteChat',
      chatAuthor,
      chatId: id,
    };

    socket.send(JSON.stringify(deleteChatMessage));
  };

  return (
    <li className="chat-nav__item">
      <button
        type="button"
        className={`chat-nav__open-chat ${isActive}`}
        onClick={handleChatIdButton}
      >
        {chat.name}
      </button>
      <button
        type="button"
        className="chat-nav__delete-chat"
        onClick={deleteChat}
      >
        X
      </button>
    </li>
  );
};
