import React, {
  useEffect, useState, MouseEvent, ChangeEvent, KeyboardEvent,
} from 'react';
import './ChatNav.scss';
import { RotatingLines } from 'react-loader-spinner';
import { ChatNavItem } from '../ChatNavItem/ChatNavItem';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import { fetchChats } from '../../state/features/chats';
import {
  errorNotification,
  successNotification,
  warningNotification,
} from '../../utils/notification';

import { socket } from '../../api/socket';
import { EventType } from '../../types/event';

export const ChatNav: React.FC = () => {
  const [creatingNewChat, setCreatingNewChat] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>('');
  const {
    chats,
    isLoading,
    hasError,
  } = useAppSelector(state => state.chats);

  const userName = localStorage.getItem('username');
  const dispatch = useAppDispatch();

  const newChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreatingNewChat(true);
  };

  const createChat = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (!chatName) {
      warningNotification('Chat name ca\'nt be empty');

      return;
    }

    const chat = {
      type: EventType.Chat,
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

    setChatName(value);
  };

  const keyboardInputHandler = (
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    if (e.key === 'Escape') {
      setCreatingNewChat(false);
    }

    if (e.key === 'Enter') {
      createChat(e);
    }
  };

  useEffect(() => {
    if (userName) {
      dispatch(fetchChats());
    }
  }, [userName]);

  useEffect(() => {
    if (hasError) {
      errorNotification('Can\'t download chats');
    }
  }, [hasError]);

  return (
    <div
      className="chat-nav"
    >
      <div className="chat-nav__add-chat">
        {creatingNewChat
          ? (
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
                onKeyUp={keyboardInputHandler}
                autoFocus
              />
            </>
          ) : (
            <button
              type="submit"
              className="chat-nav__new-chat"
              onClick={newChat}
            >
              New chat
            </button>
          )}
      </div>

      {isLoading
        ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.9"
            width="100"
            visible
          />
        ) : (
          <nav className="chat-nav__nav">
            <ul
              className="chat-nav__list"
            >
              {chats.map(chat => (
                <ChatNavItem
                  chat={chat}
                  key={chat.id}
                />
              ))}
            </ul>
          </nav>
        )}
    </div>
  );
};
