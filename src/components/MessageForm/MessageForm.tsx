import React, { FormEvent, useState, ChangeEvent } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies

const API_URL = process.env.REACT_APP_API_URL || '';
const socket = new WebSocket(API_URL);
const chatId = 1;

function sendMessage(text: string, author: string) {
  const message = JSON.stringify({ text, chatId, author });

  socket.send(message);
}

export const MessageFrom: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const author = localStorage.getItem('username');

  const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setText(value);
    setError(false);
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textForSend = text.trim();

    if (author && textForSend) {
      await sendMessage(textForSend, author);

      setText('');
    } else {
      setError(true);
      setText('');
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
        />
        <button
          type="submit"
          className={classNames('message-form__button-send',
            { 'message-form__button-send--active': text })}
          aria-label="send button"
        />

        {error
          && (
            <p className="message-form__error">
              Text input can not be empty
            </p>
          )}
      </form>

    </div>
  );
};
