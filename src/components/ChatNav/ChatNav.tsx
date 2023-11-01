import React, {
  useEffect, useState, MouseEvent, ChangeEvent,
} from 'react';
import './ChatNav.scss';
import { ChatNavItem } from '../ChatNavItem/ChatNavItem';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { fetchChats } from '../../state/features/chats';
import {
  errorNotification,
  successNotification,
} from '../../utils/notification';

import { socket } from '../../api/socket';

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
    if (!chatName) {
      errorNotification('Chat name ca\'nt be empty');

      return;
    }

    const chat = {
      type: 'chat',
      name: chatName,
      chatAuthor: userName,
    };

    socket.send(JSON.stringify(chat));

    successNotification('Chat created');
    setCreatingNewChat(false);
    setChatName('');
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
      <div className="chat-nav__add-chat">
        {!creatingNewChat
          && (
            <button
              type="submit"
              className="chat-nav__new-chat"
              onClick={newChat}
            >
              New chat
            </button>
          )}

        {creatingNewChat
          && (
            <>
              <button
                type="button"
                className="chat-nav__create-chat"
                onClick={createChat}
              >
                Create
              </button>

              <input
                type="text"
                className="chat-nav__new-chat-name"
                placeholder="Enter chat name"
                value={chatName}
                onChange={inputHandler}
              />
            </>
          )}
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
