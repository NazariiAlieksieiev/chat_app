import React, { useEffect, useRef, useState } from 'react';
import { MessageFrom } from '../MessageForm/MessageForm';
import { Message } from '../Message/Message';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import {
  fetchMessages,
  fetchMoreMessages,
} from '../../state/features/messages';

export const ChatWindow: React.FC = () => {
  const messagesContainer = useRef<HTMLDivElement | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const { messages, offset } = useAppSelector((state) => state.messages);
  const { activeChatId } = useAppSelector((state) => state.chats);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId));
    }
  }, [activeChatId, dispatch]);

  useEffect(() => {
    if (messagesContainer.current && isAutoScrolling) {
      messagesContainer
        .current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages, isAutoScrolling]);

  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainer.current
        && messagesContainer.current.scrollTop === 0) {
        if (offset > 0) {
          setIsAutoScrolling(false);
          dispatch(fetchMoreMessages({ id: activeChatId, offset }));
        }
      }
    };

    if (messagesContainer.current) {
      messagesContainer.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesContainer.current) {
        messagesContainer.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [offset, activeChatId, dispatch]);

  return (
    <div className="chat-window">
      <div className="chat-window__messages" ref={messagesContainer}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
      <MessageFrom />
    </div>
  );
};
