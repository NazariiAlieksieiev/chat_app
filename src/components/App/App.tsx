import React from 'react';
import './App.scss';
import { ChatWindow } from '../ChatWindow/ChatWindow';

export const App: React.FC = () => {
  return (
    <div className="app__container">
      <ChatWindow />
    </div>
  );
};

export default App;
