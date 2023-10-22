import React, { useEffect, useRef, useState } from 'react';
import { MessageFrom } from '../MessageForm/MessageForm';
import { Message } from '../Message/Message';
import { MessageType } from '../../types/message';
import { client } from '../../utils/axiosClient';

interface Props {
  messages: MessageType[];
  onSave: (value: MessageType[]) => void;
}

export const ChatWindow: React.FC<Props> = ({ messages, onSave }) => {
  const messagesContainer = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(10);
  const [error, setError] = useState<boolean>(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);

  useEffect(() => {
    if (messagesContainer.current && isAutoScrolling) {
      messagesContainer
        .current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages, isAutoScrolling]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        messagesContainer.current
        && messagesContainer.current.scrollTop === 0
        && !error
      ) {
        const moreMessages = async () => {
          try {
            const response: MessageType[] = await client.get(`/1?offset=${offset}`);

            onSave(response.reverse());
          } catch {
            setError(true);
          } finally {
            setOffset((current) => current + 10);
            setIsAutoScrolling(false);
          }
        };

        moreMessages();
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
  }, [error, onSave, offset]);

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
