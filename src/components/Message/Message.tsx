import React, { useEffect } from 'react';
import moment from 'moment';
import { useAnimate, usePresence, stagger } from 'framer-motion';
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
  const messageDate = moment(createdAt).format('llll');
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current,
          {
            opacity: [0, 1],
          },
          {
            duration: 0.5,
            delay: stagger(0.2),
          });
      };

      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          {
            opacity: [1, 0],
          },
          {
            duration: 0.5,
            delay: stagger(0.2),
          },
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, []);

  return (
    <div className={`message ${messageClass}`} ref={scope}>
      <div className="message__information">
        <p className="message__author">{author}</p>
        <p className="message__created-at">{messageDate}</p>
      </div>
      <p className="message__text">{text}</p>
    </div>
  );
};
