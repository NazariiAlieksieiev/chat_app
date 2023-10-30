import React, { MouseEvent } from 'react';
import '../ChatNav/ChatNav.scss';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { selectChat } from '../../state/features/chats';
import { Chat } from '../../types/chat';

interface Props {
  chat: Chat,
}

export const ChatNavItem: React.FC<Props> = ({
  chat,
}) => {
  const { activeChat } = useAppSelector(state => state.chats);

  const dispatch = useAppDispatch();

  const handleChatIdButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(selectChat(chat));
  };

  const isActive = activeChat?.id === chat.id
    ? 'chat-nav__open-chat-active'
    : '';

  return (
    <li className="chat-nav__item">
      <button
        type="button"
        className={`chat-nav__open-chat ${isActive}`}
        onClick={handleChatIdButton}
      >
        {chat.name}
      </button>
      <button type="button">X</button>
    </li>
  );
};
