import React, {
  FormEvent, useState, ChangeEvent, KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../state/app/hooks';
import { socket } from '../../api/socket';
import { EventType } from '../../types/event';
import { warningNotification } from '../../utils/notification';

export const MessageFrom: React.FC = () => {
  const [text, setText] = useState<string>('');
  const author = localStorage.getItem('username');
  const { activeChat } = useAppSelector(state => state.chats);

  const inputHandler = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setText(value);
  };

  const formHandler = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const textForSend = text.trim();

    if (!textForSend) {
      warningNotification('Text input can\'t be empty');
    }

    if (author && textForSend) {
      const message = JSON.stringify({
        type: EventType.Message,
        text: textForSend,
        author,
        chatId: activeChat?.id,
      });

      socket.send(message);
      setText('');
    } else {
      setText('');
    }
  };

  const keyboardHandler = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      formHandler(e);
    }
  };

  return (
    <div className="message-form">
      <form
        className="message-form__form"
        onSubmit={formHandler}
      >
        <textarea
          value={text}
          className="message-form__text"
          onChange={inputHandler}
          onKeyUp={keyboardHandler}
          autoFocus
        />
        <button
          type="submit"
          disabled={Boolean(text)}
          className={classNames('message-form__button-send',
            { 'message-form__button-send--active': text })}
          aria-label="send button"
        />
      </form>
    </div>
  );
};
