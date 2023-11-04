import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { ModalSetName } from '../ModalSetName/ModalSetName';
import { ChatNav } from '../ChatNav/ChatNav';
import { WSLoader } from '../WSLoader/WSLoader';
import { useAppSelector } from '../../state/app/hooks';
import { StartPage } from '../StartPage/StartPage';

export const App: React.FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(true);
  const { activeChat } = useAppSelector(state => state.chats);
  const username = localStorage.getItem('username');

  useEffect(() => {

  }, [username]);

  return (
    <div className="app">
      <ChatNav />
      {!username
        && (
          <ModalSetName
            isActive={modalActive}
            setActive={setModalActive}
          />
        )}

      <div className="app__container">
        <WSLoader />
        {activeChat
          ? (<ChatWindow />
          )
          : (<StartPage />)}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
