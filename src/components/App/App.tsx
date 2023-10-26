import React, { useState } from 'react';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { ModalSetName } from '../ModalSetName/ModalSetName';
import { ChatNav } from '../ChatNav/ChatNav';
import { WSLoader } from '../WSLoader/WSLoader';

export const App: React.FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(true);
  const isLogged = localStorage.getItem('username');

  return (
    <div className="app">
      <ChatNav />
      {!isLogged
        && (
          <ModalSetName
            isActive={modalActive}
            setActive={setModalActive}
          />
        )}

      <div className="app__container">
        <WSLoader />
        <ChatWindow />
      </div>
    </div>
  );
};

export default App;
