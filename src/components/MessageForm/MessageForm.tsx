import React from 'react';
import './MessageForm.scss';
import classNames from 'classnames';

export const MessageFrom: React.FC = () => {
  const isActive = true;

  return (
    <div className="message-form">
      <form action="/message" className="message-form__form">
        <textarea className="message-form__input" />
        <button
          type="submit"
          className={classNames('message-form__button-send',
            { active: isActive })}
          aria-label="send button"
        />
      </form>
    </div>
  );
};
