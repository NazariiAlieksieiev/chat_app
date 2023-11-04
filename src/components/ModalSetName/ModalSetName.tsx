import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import {
  errorNotification,
  successNotification,
} from '../../utils/notification';

interface Props {
  isActive: boolean,
  setActive: (value: boolean) => void
}

export const ModalSetName: React.FC<Props> = ({ isActive, setActive }) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveName = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const username = name.trim();

    if (!username) {
      errorNotification('Enter your name to continue');
      setName('');

      return;
    }

    localStorage.setItem('username', username);
    successNotification('User was created');
    setActive(false);
  };

  const keyboardInputHandler = (
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      handleSaveName(e);
    }
  };

  return (
    <>
      <CSSTransition
        in={isActive}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Enter Name</h2>
            <input
              className="modal__input"
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyUp={keyboardInputHandler}
              required
            />

            <button
              className={classNames(
                'modal__save-button',
                { 'modal__save-button--active': name.length > 0 },
              )}
              type="submit"
              onClick={handleSaveName}
            >
              Save
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
