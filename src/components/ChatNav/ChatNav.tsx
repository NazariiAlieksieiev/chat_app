import React, {
  useEffect, useState, MouseEvent, ChangeEvent,
} from 'react';
import './ChatNav.scss';
import { ChatNavItem } from '../ChatNavItem/ChatNavItem';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { fetchChats } from '../../state/features/chats';

const API_URL = process.env.REACT_APP_API_URL || '';
const socket = new WebSocket(API_URL);

export const ChatNav: React.FC = () => {
  const [creatingNewChat, setCreatingNewChat] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>('');
  const {
    chats,
    // isLoading,
    // hasError,
  } = useAppSelector(state => state.chats);
  const userName = localStorage.getItem('username');

  const dispatch = useAppDispatch();

  const newChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreatingNewChat(true);
  };

  const createChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = {
      type: 'chat',
      name: chatName,
      chatAuthor: userName,
    };

    socket.send(JSON.stringify(message));
    setCreatingNewChat(false);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const name = value.trim();

    setChatName(name);
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <div
      className="chat-nav"
    >
      <div className="chat-nav__new-chat">
        <button
          type="submit"
          className="chat-nav__add-chat"
          onClick={newChat}
        >
          New chat
        </button>
        {creatingNewChat
          && (
            <button
              type="button"
              onClick={createChat}
            >
              Create
            </button>
          )}

        <input
          type="text"
          placeholder="enter chat name"
          value={chatName}
          onChange={inputHandler}
        />
      </div>

      <nav className="chat-nav__nav">
        <ul className="chat-nav__list">
          {chats.map(chat => (
            <ChatNavItem
              chat={chat}
              key={chat.id}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
