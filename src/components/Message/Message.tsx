import React from 'react';
import './Message.scss';

export const Message: React.FC = () => {
  const message = {
    role: 'user',
    content: 'Hello world!',
  };
  const { role, content } = message;
  const messageClass = role === 'user' ? 'message__user' : 'message__assistant';

  return (
    <div className={`message ${messageClass}`}>
      <p className="message__text">{content}</p>
    </div>
  );
};
