import { useEffect } from 'react';
import { MessageType } from '../../types/message';
import { client } from '../../utils/axiosClient';

interface Props {
  onData: (message: MessageType) => void,
  onSave: (messages: MessageType[]) => void,
}

const API_URL = process.env.REACT_APP_API_URL;

export const WebSocketDownLoader: React.FC<Props> = ({ onData, onSave }) => {
  useEffect(() => {
    const fetchMessages = async () => {
      const newMessages: MessageType[] = await client
        .get('/1');

      onSave(newMessages.reverse());
    };

    fetchMessages();

    if (!API_URL) {
      throw new Error('Invalid API');
    }

    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      onData(message);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <h1 className="title">
      Chat application
    </h1>
  );
};
