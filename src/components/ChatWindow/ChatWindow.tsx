import React, { useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { MessageFrom } from '../MessageForm/MessageForm';
import { Message } from '../Message/Message';
import { useAppDispatch, useAppSelector } from '../../state/app/hooks';
import {
  fetchMessages,
  fetchMoreMessages,
} from '../../state/features/messages';
import { errorNotification } from '../../utils/notification';

export const ChatWindow: React.FC = () => {
  const messagesContainer = useRef<HTMLDivElement | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const {
    messages,
    offset,
    isLoading,
    hasError,
  } = useAppSelector((state) => state.messages);
  const { activeChat } = useAppSelector((state) => state.chats);

  const dispatch = useAppDispatch();
  const loaded = !isLoading && messages;

  useEffect(() => {
    if (activeChat) {
      dispatch(fetchMessages(activeChat?.id));
    }
  }, [activeChat, dispatch]);

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
        if (offset > 0 && activeChat?.id) {
          setIsAutoScrolling(false);
          dispatch(fetchMoreMessages({ id: activeChat.id, offset }));
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
  }, [offset, activeChat, dispatch]);

  useEffect(() => {
    if (hasError) {
      errorNotification('Can\'nt download messages');
    }
  }, [hasError]);

  return (
    <div className="chat-window">
      <div className="chat-window__messages" ref={messagesContainer}>
        {
          loaded
            ? (messages.map((message) => (
              <Message message={message} key={message.id} />
            )))
            : (
              <div className="chat-window__loader">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="3"
                  animationDuration="0.9"
                  width="100"
                  visible
                />
              </div>
            )
        }
      </div>

      <MessageFrom />
    </div>
  );
};
