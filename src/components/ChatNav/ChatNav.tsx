import React, { useEffect } from 'react';
import './ChatNav.scss';
import { ChatNavItem } from '../ChatNavItem/ChatNavItem';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { fetchChats } from '../../state/features/chats';

export const ChatNav: React.FC = () => {
  const {
    chats,
    // isLoading,
    // hasError,
  } = useAppSelector(state => state.chats);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <div
      className="chat-nav"
    >
      <button type="submit" className="chat-nav__add-chat">
        +
      </button>
      <nav className="chat-nav__nav">
        <ul className="chat-nav__list">
          {chats.map(chat => (
            <ChatNavItem
              name={chat.name}
              key={chat.id}
              id={chat.id}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
