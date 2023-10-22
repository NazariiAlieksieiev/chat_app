import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

interface Props {
  isActive: boolean,
  setActive: (value: boolean) => void
}

export const ModalSetName: React.FC<Props> = ({ isActive, setActive }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setName(e.target.value);
  };

  const handleSaveName = (e: React.MouseEvent) => {
    e.preventDefault();
    const username = name.trim();

    if (!username) {
      setError(true);
      setName('');

      return;
    }

    localStorage.setItem('username', username);
    setActive(false);
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

            {error
              && <p className="modal__error">Enter your Name</p>}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
