import React, {
  ChangeEvent, KeyboardEvent, MouseEvent, useState, FormEvent, FocusEvent,
} from 'react';
import '../ChatNav/ChatNav.scss';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import {
  renameChat,
  selectChat,
  setRenamedChat,
} from '../../state/features/chats';
import { Chat } from '../../types/chat';
import { socket } from '../../api/socket';
import { errorNotification } from '../../utils/notification';

interface Props {
  chat: Chat,
}

export const ChatNavItem: React.FC<Props> = ({
  chat,
}) => {
  const { activeChat, renamedChat } = useAppSelector(state => state.chats);
  const [newName, setNewName] = useState<string>('');
  const username = localStorage.getItem('username');
  const dispatch = useAppDispatch();
  const isActive = activeChat?.id === chat.id
    ? 'chat-nav__open-chat-active'
    : '';

  const handleChatIdButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(selectChat(chat));
  };

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

  const setToRename = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
    value: Chat | null,
  ) => {
    e.preventDefault();

    if (!value) {
      dispatch(setRenamedChat(value));

      return;
    }

    if (value?.chatAuthor !== username) {
      errorNotification('Chat can rename only his author');

      return;
    }

    dispatch(setRenamedChat(value));
  };

  const newNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    const name = value.trim();

    if (!name) {
      errorNotification('Chat name ca\'nt be empty');
    }

    setNewName(name);
  };

  const rename = (
    e: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const params = {
      chatId: chat.id,
      newTitle: newName,
      chatAuthor: renamedChat?.chatAuthor,
    };

    if (!newName) {
      errorNotification('Chat name can\'nt be empty');
      renameChat({ ...params, newTitle: chat.name });
      dispatch(setRenamedChat(null));

      return;
    }

    dispatch(setRenamedChat(null));
    const renameChatMessage = {
      type: 'renameChat',
      ...params,
    };

    setNewName('');

    socket.send(JSON.stringify(renameChatMessage));
  };

  const escapeInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape'
    ) {
      setToRename(e, null);
    }
  };

  return (
    <li className="chat-nav__item">
      {chat.id === renamedChat?.id
        ? (
          <form onSubmit={rename}>
            <input
              type="text"
              className="chat-nav__new-name"
              value={newName}
              onKeyUp={escapeInput}
              onChange={newNameHandler}
              onBlur={rename}
              autoFocus
            />
          </form>
        )
        : <></>}
      <button
        type="button"
        className={`chat-nav__open-chat ${isActive}`}
        onClick={handleChatIdButton}
        onDoubleClick={(e) => setToRename(e, chat)}
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
