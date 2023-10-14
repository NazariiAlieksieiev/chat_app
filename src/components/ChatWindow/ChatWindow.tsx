import React from 'react';
import { MessageFrom } from '../MessageForm/MessageForm';
import { Message } from '../Message/Message';

export const ChatWindow: React.FC = () => {
  return (
    <div className="chat-window">
      <div className="chat-window__messages">
        <Message />
      </div>
      <MessageFrom />
    </div>
  );
};
