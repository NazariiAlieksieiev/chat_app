import React from 'react';
import moment from 'moment';
import { MessageType } from '../../types/message';

interface Props {
  message: MessageType,
}

export const Message: React.FC<Props> = ({ message }) => {
  const { text, author, createdAt } = message;
  const username = localStorage.getItem('username');
  const messageClass = author === username
    ? 'message__user'
    : 'message__other';
  const messageDate = moment(createdAt).format('MMMM Do YYYY');

  return (
    <div className={`message ${messageClass}`}>
      <div className="message__information">
        <p className="message__author">{author}</p>
        <p className="message__created-at">{messageDate}</p>
      </div>
      <p className="message__text">{text}</p>
    </div>
  );
};
