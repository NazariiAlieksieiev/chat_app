import React, { useState } from 'react';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { MessageType } from '../../types/message';
import { WebSocketDownLoader } from '../WSDownloader/WebSocketDownloader';
import { ModalSetName } from '../ModalSetName/ModalSetName';

export const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [modalActive, setModalActive] = useState<boolean>(true);

  const isLogged = localStorage.getItem('username');

  const saveData = (message: MessageType) => {
    setMessages(current => [...current, message]);
  };

  const addMessages = (newMessages: MessageType[]) => {
    setMessages(current => [...newMessages, ...current]);
  };

  return (
    <>
      {!isLogged
        && (
          <ModalSetName
            isActive={modalActive}
            setActive={setModalActive}
          />
        )}

      <div className="app__container">
        {isLogged
          && (
            <WebSocketDownLoader
              onData={saveData}
              onSave={setMessages}
            />
          )}

        <ChatWindow
          messages={messages}
          onSave={addMessages}
        />
      </div>
    </>
  );
};

export default App;
