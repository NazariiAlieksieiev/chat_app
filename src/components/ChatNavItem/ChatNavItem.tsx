import React, { MouseEvent } from 'react';
import '../ChatNav/ChatNav.scss';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { selectChat } from '../../state/features/chats';

interface Props {
  name: string,
  id: number,
}

export const ChatNavItem: React.FC<Props> = ({
  name, id,
}) => {
  const { activeChatId } = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  const handleChatIdButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(selectChat(id));
  };

  const isActive = activeChatId === id ? 'chat-nav__open-chat-active' : '';

  return (
    <li className="chat-nav__item">
      <button
        type="button"
        className={`chat-nav__open-chat ${isActive}`}
        onClick={handleChatIdButton}
      >
        {name}
      </button>
      <button type="button">X</button>
    </li>
  );
};
