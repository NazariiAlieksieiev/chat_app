import { useEffect } from 'react';
import { useAppDispatch } from '../../state/app/hooks';
import { addMessage } from '../../state/features/messages';

const API_URL = process.env.REACT_APP_API_URL;

export const WSLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!API_URL) {
      throw new Error('Invalid API');
    }

    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      dispatch(addMessage(message));
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
